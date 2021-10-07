/* eslint-disable @typescript-eslint/no-var-requires */
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersService, User } from '@front-end/users';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss'],
})
export class UsersEditComponent implements OnInit {
  form: FormGroup;
  isSubmitted: boolean;
  isEditMode = false;
  currentUserId= undefined;
  countries: { id: string; name: string; }[];

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private messageService: MessageService,
    private locationService: Location,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['',Validators.required],
      phone: ['', Validators.required],
      isAdmin: [false],
      street: [''],
      apartment: [''],
      zipCode: [''],
      city: [''],
      country: [''],
    });

    this._checkEditMode();
    this._getCountries();
  }

  private _getCountries() {
    this.countries = this.usersService.getCountries();
  }

  onSubmit() {
    this.isSubmitted = true;

    if (!this.form.invalid) {
      const user: User = {
        id: this.currentUserId,
        name: this.userForm.name.value,
        email: this.userForm.email.value,
        password: this.userForm.password.value,
        phone: this.userForm.phone.value,
        isAdmin: this.userForm.isAdmin.value,
        street: this.userForm.street.value,
        apartment: this.userForm.apartment.value,
        zip: this.userForm.zipCode.value,
        city: this.userForm.city.value,
        country: this.userForm.country.value
      };
      if (this.isEditMode) {
        this._updateUser(user);
      } else {
        this._addUser(user);
      }
    }
  }

  private _addUser(user: User) {
    this.usersService.createUser(user).subscribe(
      (res: User) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `User ${res.name} is created`,
        });
        timer(1500)
          .toPromise()
          .then(() => {
            this.locationService.back();
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'User is not created',
        });
      }
    );
  }

  private _updateUser(user: User) {
    this.usersService.updateUser(user).subscribe(
      (res: User) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `User ${res.name} is updated`,
        });
        timer(1500)
          .toPromise()
          .then(() => {
            this.locationService.back();
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'User is not updated',
        });
      }
    );
  }

  private _checkEditMode() {
    this.router.params.subscribe((params) => {
      if (params.id) {
        this.isEditMode = true;
        this.currentUserId = params.id;
        this.usersService.getUser(params.id).subscribe((user) => {
          this.userForm.name.setValue(user.name);
          this.userForm.email.setValue(user.email);
          this.userForm.isAdmin.setValue(user.isAdmin);
          this.userForm.street.setValue(user.street);
          this.userForm.apartment.setValue(user.apartment);
          this.userForm.zipCode.setValue(user.zip);
          this.userForm.city.setValue(user.city);
          this.userForm.country.setValue(user.country);

          this.userForm.password.setValidators([]);
          this.userForm.password.updateValueAndValidity();
        });
      }
    });
  }

  get userForm() {
    return this.form.controls;
  }
}
