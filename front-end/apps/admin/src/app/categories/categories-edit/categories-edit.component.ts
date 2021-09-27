import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: ProductsService,
    private messageService: MessageService,
    private locationService: Location
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
    });
  }

  onSubmit() {
    this.isSubmitted = true;

    if (!this.form.invalid) {
      const category: Category = {
        name: this.categoryForm.name.value,
        icon: this.categoryForm.icon.value,
      };
      this.categoriesService.createCategory(category).subscribe(res => {
        this.messageService.add({severity:'success', summary:'Success', detail:'Category is created'});
        timer(2000).toPromise().then(done => {
          this.locationService.back();
        })
      }, err => {
        this.messageService.add({severity:'error', summary:'Error', detail:'Category is not created'});
      });
    }
  }

  get categoryForm() {
    return this.form.controls;
  }
}
