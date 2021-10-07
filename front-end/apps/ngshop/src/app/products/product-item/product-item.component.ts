import { Component, Input } from '@angular/core';
import { Product } from '@front-end/products';
import { CartItem, CartService } from '@front-end/orders';

@Component({
  selector: 'ngshop-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent {
  @Input() product: Product;

  constructor(private cartService: CartService) {}

  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: 1,
    };
    
    this.cartService.setCartItem(cartItem);
  }
}
