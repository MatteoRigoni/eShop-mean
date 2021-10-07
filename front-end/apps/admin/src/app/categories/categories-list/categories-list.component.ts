import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category, ProductsService } from '@front-end/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
})
export class CategoriesListComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  endSubs$: Subject<any> = new Subject();

  constructor(
    private confirmationService: ConfirmationService,
    private categoriesService: ProductsService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.endSubs$.complete();
  }

  ngOnDestroy(): void {
    this.endSubs$.complete();
  }

  private getCategories() {
    this.categoriesService.getCategories()
    .pipe(takeUntil(this.endSubs$))
    .subscribe((res) => {
      this.categories = res;
    });
  }

  updateCategory(categoryId: string) {
    this.router.navigateByUrl(`categories/edit/${categoryId}`);
  }

  deleteCategory(categoryId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to proceed?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoriesService.deleteCategory(categoryId).subscribe(
          (res: Category) => {
            this.getCategories();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: `Category ${res.name} is deleted`,
            });
          },
          () => {
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
