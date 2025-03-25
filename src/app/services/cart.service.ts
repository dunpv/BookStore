import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: any[] = [];

  constructor() {}

  addToCart(book: any) {
    const existingItem = this.cart.find((item) => item.id === book.id);
    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      this.cart.push({ ...book, quantity: 1 });
    }
  }

  getCart() {
    return this.cart;
  }

  setCart(updatedCart: any[]) {
    this.cart = updatedCart;
  }

  removeFromCart(index: number) {
    this.cart.splice(index, 1);
  }

  clearCart() {
    this.cart = [];
  }
}
