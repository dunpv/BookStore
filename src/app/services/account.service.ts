import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs'; // Dùng để mã hóa mật khẩu

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private users = signal<
    {
      name: string;
      email: string;
      phone: string;
      address?: string;
      passwordHash: string;
    }[]
  >(this.loadUsers());

  private loggedInUser = signal<{
    name: string;
    email: string;
    phone: string;
    address?: string;
  } | null>(this.loadLoggedInUser());

  constructor(private router: Router) {}

  // ✅ Load danh sách người dùng từ localStorage
  private loadUsers() {
    try {
      return JSON.parse(localStorage.getItem('users') || '[]');
    } catch {
      return [];
    }
  }

  // ✅ Load thông tin người dùng đã đăng nhập từ localStorage
  private loadLoggedInUser() {
    try {
      return JSON.parse(localStorage.getItem('loggedInUser') || 'null');
    } catch {
      return null;
    }
  }

  // ✅ Lưu danh sách người dùng vào localStorage
  private saveUsers() {
    localStorage.setItem('users', JSON.stringify(this.users()));
  }

  // ✅ Lưu thông tin người dùng đăng nhập vào localStorage
  private saveLoggedInUser() {
    if (this.loggedInUser()) {
      localStorage.setItem('loggedInUser', JSON.stringify(this.loggedInUser()));
    }
  }

  // ✅ Đăng ký tài khoản
  register(user: {
    name: string;
    email: string;
    phone: string;
    address?: string;
    password: string;
  }): boolean {
    const existingUser = this.users().find((u) => u.email === user.email);
    if (existingUser) {
      alert('Email đã tồn tại!');
      return false;
    }

    const passwordHash = bcrypt.hashSync(user.password, 10);
    const newUser = {
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      passwordHash,
    };

    this.users.set([...this.users(), newUser]);
    this.saveUsers(); // Lưu vào localStorage
    alert('Đăng ký thành công! Hãy đăng nhập.');
    return true;
  }

  // ✅ Đăng nhập
  login(email: string, password: string): boolean {
    const user = this.users().find((u) => u.email === email);
    if (user && bcrypt.compareSync(password, user.passwordHash)) {
      this.loggedInUser.set({
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      });
      this.saveLoggedInUser(); // Lưu vào localStorage
      this.router.navigate(['/account']); // Chuyển hướng sau khi đăng nhập
      return true;
    }
    alert('Sai email hoặc mật khẩu!');
    return false;
  }

  // ✅ Lấy thông tin người dùng đăng nhập
  getUser() {
    return this.loggedInUser();
  }

  // ✅ Kiểm tra trạng thái đăng nhập
  isLoggedIn = computed(() => this.loggedInUser() !== null);

  // ✅ Đăng xuất
  logout() {
    this.loggedInUser.set(null);
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }
}
