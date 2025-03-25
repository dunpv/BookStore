import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="admin-menu">
      <ul>
        <li><a routerLink="/admin/dashboard">Trang chủ Admin</a></li>
        <li><a routerLink="/admin/book-management">Quản lý Sách</a></li>
        <li><a routerLink="/admin/orders">Quản lý Đơn hàng</a></li>
        <li><a routerLink="/admin/users">Quản lý Người dùng</a></li>
      </ul>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [
    `
      .admin-menu {
        background: #333;
        padding: 10px;
      }
      .admin-menu ul {
        list-style: none;
        padding: 0;
      }
      .admin-menu li {
        display: inline-block;
        margin-right: 15px;
      }
      .admin-menu a {
        color: white;
        text-decoration: none;
        padding: 5px 10px;
      }
      .admin-menu a:hover {
        background: #555;
        border-radius: 5px;
      }
    `,
  ],
})
export class AdminComponent {}
