import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AccountComponent } from './components/account/account.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { BookManagementComponent } from './components/admin/book-management/book-management.component'; // Quản lý sách
// import { OrderManagementComponent } from './components/admin/order-management/order-management.component'; // Quản lý đơn hàng
// import { UserManagementComponent } from './components/admin/user-management/user-management.component'; // Quản lý người dùng

export const appRoutes: Routes = [
  { path: '', component: HomeComponent }, // Trang chủ
  { path: 'books', component: BookListComponent }, // Danh mục sách
  { path: 'book/:id', component: BookDetailComponent }, // Chi tiết sách
  { path: 'cart', component: CartComponent }, // Giỏ hàng
  { path: 'checkout', component: CheckoutComponent }, // Thanh toán
  { path: 'account', component: AccountComponent }, // Tài khoản
  { path: 'register', component: RegisterComponent }, // Đăng ký
  { path: 'login', component: LoginComponent }, // Đăng nhập
  { path: 'admin', component: AdminComponent }, // Trang quản trị
  // { path: 'admin/books', component: BookManagementComponent }, // Quản lý sách
  // { path: 'admin/orders', component: OrderManagementComponent }, // Quản lý đơn hàng
  // { path: 'admin/users', component: UserManagementComponent }, // Quản lý người dùng
  // { path: '**', redirectTo: '' }, // Điều hướng đến trang chủ nếu route không hợp lệ
];
