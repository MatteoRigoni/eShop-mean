import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Category, ProductsService } from '@front-end/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-categories-edit',
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.scss'],
})
export class CategoriesEditComponent implements OnInit {
  form: FormGroup;
  isSubmitted: boolean;
  isEditMode = false;
  currentCategoryId= undefined;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: ProductsService,
    private messageService: MessageService,
    private locationService: Location,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['#fff']
    });

    this._checkEditMode();
  }

  onSubmit() {
    this.isSubmitted = true;

    if (!this.form.invalid) {
      const category: Category = {
        id: this.currentCategoryId,
        name: this.categoryForm.name.value,
        icon: this.categoryForm.icon.value,
        color: this.categoryForm.color.value,
      };
      if (this.isEditMode) {
        this._updateCategory(category);
      } else {
        this._addCategory(category);
      }
    }
  }

  private _addCategory(category: Category) {
    this.categoriesService.createCategory(category).subscribe(
      (res: Category) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Category ${res.name} is created`,
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
          detail: 'Category is not created',
        });
      }
    );
  }

  private _updateCategory(category: Category) {
    this.categoriesService.updateCategory(category).subscribe(
      (res: Category) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Category ${res.name} is updated`,
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
          detail: 'Category is not updated',
        });
      }
    );
  }

  private _checkEditMode() {
    this.router.params.subscribe((params) => {
      if (params.id) {
        this.isEditMode = true;
        this.currentCategoryId = params.id;
        this.categoriesService.getCategory(params.id).subscribe((category) => {
          this.categoryForm.name.setValue(category.name);
          this.categoryForm.icon.setValue(category.icon);
          this.categoryForm.color.setValue(category.color);
        });
      }
    });
  }

  get categoryForm() {
    return this.form.controls;
  }
}
