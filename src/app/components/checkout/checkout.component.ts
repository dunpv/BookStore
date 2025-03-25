import { Component, inject, signal } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  imports: [CommonModule, RouterModule, FormsModule],
  standalone: true,
})
export class CheckoutComponent {
  cartService = inject(CartService);
  cart = signal(this.cartService.getCart());

  totalPrice = signal(
    this.cart().reduce((total, item) => total + item.price, 0)
  );

  completePurchase() {
    alert('Thanh toán thành công!');
    this.cartService.clearCart();
    this.cart.set([]);
  }
}
