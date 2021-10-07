import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem, CartService } from '@front-end/orders';
import { Product, ProductsService } from '@front-end/products';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngshop-products-deatil',
  templateUrl: './products-deatil.component.html',
  styleUrls: ['./products-deatil.component.scss'],
})
export class ProductsDeatilComponent implements OnInit {
  product: Product;
  endSubs$: Subject<any> = new Subject();
  quantity: number;

  constructor(
    private prodService: ProductsService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params.productid) {
        this._getProduct(params.productid);
      }
    });
  }

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: this.quantity,
    };

    this.cartService.setCartItem(cartItem);
  }

  private _getProduct(id: string) {
    this.prodService
      .getProduct(id)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((resProduct) => {
        this.product = resProduct;
      });
  }
}
