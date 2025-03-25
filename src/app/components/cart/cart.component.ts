import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  imports: [CommonModule, RouterModule],
  styleUrls: ['./cart.component.scss'],
  standalone: true,
})
export class CartComponent implements OnInit {
  private cartService = inject(CartService);
  cartItems = signal<any[]>([]);

  constructor() {
    this.loadCartFromStorage(); // 🔥 Load giỏ hàng khi component khởi tạo
  }

  ngOnInit() {
    this.loadCartFromStorage();
  }

  // ✅ Tính tổng giá tiền dựa trên số lượng sản phẩm
  totalPrice = computed(() =>
    this.cartItems().reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    )
  );

  // ✅ Load giỏ hàng từ localStorage khi tải trang
  loadCartFromStorage() {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      this.cartItems.set(JSON.parse(storedCart));
    } else {
      this.cartItems.set(this.cartService.getCart());
    }
  }

  // ✅ Cập nhật số lượng sản phẩm và lưu vào localStorage
  updateQuantity(index: number, change: number) {
    const updatedCart = [...this.cartItems()];
    if (updatedCart[index]) {
      updatedCart[index].quantity = Math.max(
        1,
        (updatedCart[index].quantity || 1) + change
      );
      this.cartItems.set(updatedCart);
      this.saveCartToStorage();
    }
  }

  // ✅ Xóa sản phẩm và lưu lại giỏ hàng vào localStorage
  removeFromCart(index: number) {
    const updatedCart = [...this.cartItems()];
    updatedCart.splice(index, 1);
    this.cartItems.set(updatedCart);
    this.saveCartToStorage();
  }

  // ✅ Thanh toán và reset giỏ hàng
  checkout() {
    const totalAmount = this.totalPrice();
    if (totalAmount > 0) {
      alert(
        `Thanh toán thành công! Tổng số tiền: ${totalAmount.toLocaleString()} VND`
      );
      this.cartService.clearCart();
      this.cartItems.set([]);
      localStorage.removeItem('cartItems'); // ❌ Xóa dữ liệu giỏ hàng khi thanh toán
    } else {
      alert('Giỏ hàng của bạn đang trống.');
    }
  }

  // ✅ Lưu giỏ hàng vào localStorage
  private saveCartToStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems()));
  }
}
