import { Component, OnInit } from '@angular/core';
import { Category, ProductsService } from '@front-end/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
})
export class CategoriesListComponent implements OnInit {
  categories: Category[] = [];

  constructor(
    private confirmationService: ConfirmationService,
    private categoriesService: ProductsService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories() {
    this.categoriesService.getCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  deleteCategory(categoryId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to proceed?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoriesService.deleteCategory(categoryId).subscribe(
          (res) => {
            this.getCategories();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Category is deleted',
            });
          },
          (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Category is not deleted',
            });
          }
        );
      }
    });
  }
}
