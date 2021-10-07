import { Component, OnInit } from '@angular/core';
import { CartService } from '@front-end/orders';

@Component({
  selector: 'ngshop-orders-cart-icon',
  templateUrl: './orders-cart-icon.component.html',
  styleUrls: ['./orders-cart-icon.component.scss']
})
export class OrdersCartIconComponent implements OnInit {
  cartCount = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart) => {
      this.cartCount = cart?.items.length ?? 0;
    });

  }

}
