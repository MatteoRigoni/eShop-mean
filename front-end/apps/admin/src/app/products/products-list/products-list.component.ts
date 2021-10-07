import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService, Product } from '@front-end/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products: Product[];
  endSubs$: Subject<any> = new Subject();

  constructor(
    private productService: ProductsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  ngOnDestroy(): void {
    this.endSubs$.complete();
  }

  private getProducts() {
    this.productService.getProducts()
    .pipe(takeUntil(this.endSubs$))
    .subscribe((res) => {
      this.products = res;
    });
  }

  updateProduct(productId: string) {
    this.router.navigateByUrl(`products/edit/${productId}`);
  }

  deleteProduct(productId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to proceed?',
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.deleteProduct(productId).subscribe(
          (res: Product) => {
            this.getProducts();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: `Product ${res.name} is deleted`,
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Product is not deleted',
            });
          }
        );
      },
    });
  }
}
