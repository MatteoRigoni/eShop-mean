import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { UiModule } from '@front-end/ui';
import { CartService } from './services/cart.service';

@NgModule({
  imports: [CommonModule, UiModule],
  declarations: [
  ],
  exports: [
  ]
})
export class OrdersModule{
  /**
   *
   */
  constructor(cartService: CartService) {
    cartService.initCartLocalStorage();
  }
}
