import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Category, Product, ProductsService } from '@front-end/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'admin-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.scss'],
})
export class ProductsEditComponent implements OnInit {
  form: FormGroup;
  isSubmitted: boolean;
  isEditMode = false;
  currentProductId = '';
  categories: Category[] = [];
  imageDisplay: string | ArrayBuffer | null;

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private messageService: MessageService,
    private locationService: Location,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
    this._checkEditMode();
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: [0, Validators.required],
      category: ['', Validators.required],
      countInStock: [0, Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: [''],
      isFeatured: [false],
    });
  }

  private _getCategories() {
    this.productsService.getCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  getFormValidationErrors() {
    Object.keys(this.form.controls).forEach(key => {

    const controlErrors = this.form.get(key)?.errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
          });
        }
      });
    }

  onSubmit() {
    this.isSubmitted = true;

    this.getFormValidationErrors();
    if (!this.form.invalid) {
      const productFormData = new FormData();

      Object.keys(this.productForm).map((key) => {
        productFormData.append(key, this.productForm[key].value);
      });

      if (this.isEditMode) {
        this._updateProduct(productFormData);
      } else {
        this._addProduct(productFormData);
      }
    }
  }

  private _addProduct(productFormData: FormData) {
    this.productsService.createProduct(productFormData).subscribe(
      (res: Product) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Product ${res.name} is created`,
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
          detail: 'Product is not created',
        });
      }
    );
  }

  private _updateProduct(productFormData: FormData) {
    this.productsService.updateProduct(productFormData, this.currentProductId).subscribe(
      (res: Product) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Product ${res.name} is updated`,
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
          detail: 'Product is not updated',
        });
      }
    );
  }

  private _checkEditMode() {
    this.router.params.subscribe((params) => {
      if (params.id) {
        this.isEditMode = true;
        this.currentProductId = params.id;
        this.productsService.getProduct(params.id).subscribe((product) => {
          this.productForm.name.setValue(product.name);
          this.productForm.brand.setValue(product.brand);
          this.productForm.price.setValue(product.price);
          this.productForm.category.setValue(product.category?.id);
          this.productForm.countInStock.setValue(product.countInStock);
          this.productForm.description.setValue(product.description);
          this.productForm.richDescription.setValue(product.richDescription);
          if (product.image) this.imageDisplay = product.image;
        });
      }
    });
  }

  onImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ image: file });
      this.form.get('image')?.updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  }

  get productForm() {
    return this.form.controls;
  }
}
