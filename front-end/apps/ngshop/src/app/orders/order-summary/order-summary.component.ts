import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService, OrdersService } from '@front-end/orders';
import { ProductsService } from '@front-end/products';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngshop-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
  export class OrderSummaryComponent implements OnInit, OnDestroy {
    endSubs$: Subject<any> = new Subject();
    totalPrice: number;
    isCheckout = false;
    constructor(
      private router: Router,
      private cartService: CartService,
      private ordersService: ProductsService
    ) {
      this.router.url.includes('checkout') ? (this.isCheckout = true) : (this.isCheckout = false);
    }

    ngOnInit(): void {
      this._getOrderSummary();
    }

    ngOnDestroy(): void {
      this.endSubs$.next();
      this.endSubs$.complete();
    }

    _getOrderSummary() {
      this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe((cart) => {
        this.totalPrice = 0;
        if (cart) {
          cart.items.map((item) => {
            this.ordersService
              .getProduct(item.productId)
              .pipe(take(1))
              .subscribe((product) => {
                this.totalPrice += product.price * item.quantity;
              });
          });
        }
      });
    }

    navigateToCheckout() {
      this.router.navigate(['/orders/checkout']);
    }
  }

