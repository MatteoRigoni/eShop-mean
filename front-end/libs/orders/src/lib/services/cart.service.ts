import { Injectable } from '@angular/core';
import { Cart, CartItem } from '@front-end/orders';
import { BehaviorSubject, Subject } from 'rxjs';

export const CART_KEY = 'cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart$: BehaviorSubject<Cart> = new BehaviorSubject<Cart>(this.getCart());

  initCartLocalStorage() {
    const initialCart = {
      items: [],
    };

    const existingCart = this.getCart();
    if (!existingCart) {
      localStorage.setItem(CART_KEY, JSON.stringify(initialCart));
    }
  }

  getCart(): Cart {
    const cartString: string = localStorage.getItem(CART_KEY);
    const cart: Cart = JSON.parse(cartString);
    return cart;
  }

  setCartItem(cartItem: CartItem, updateCartItem?: boolean): Cart {
    const cart = this.getCart();
    const cartItemExist = cart.items.find((item) => item.productId === cartItem.productId);
    if (cartItemExist) {
      cart.items.map((item) => {
        if (item.productId === cartItem.productId) {
          if (updateCartItem) {
            item.quantity = cartItem.quantity;
          } else {
            item.quantity = item.quantity + cartItem.quantity;
          }
        }
        return item;
      });
    } else {
      cart.items.push(cartItem);
    }

    const cartJson = JSON.stringify(cart);
    localStorage.setItem(CART_KEY, cartJson);
    this.cart$.next(cart);
    return cart;
  }

  deleteCartItem(productId: string) {
    const cart = this.getCart();
    const newCart = cart.items.filter((item) => item.productId !== productId);

    cart.items = newCart;

    const cartJsonString = JSON.stringify(cart);
    localStorage.setItem(CART_KEY, cartJsonString);

    this.cart$.next(cart);
  }
}
