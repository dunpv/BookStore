import { Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccountService } from './../../../services/account.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  private accountService = inject(AccountService);
  private router = inject(Router);

  user = signal({ name: '', email: '', phone: '', address: '', password: '' });

  register() {
    if (
      !this.user().name ||
      !this.user().email ||
      !this.user().phone ||
      !this.user().password
    ) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    if (this.accountService.register(this.user())) {
      this.user.set({
        name: '',
        email: '',
        phone: '',
        address: '',
        password: '',
      });
      alert('Đăng ký thành công! Chuyển hướng sang đăng nhập.');
      this.router.navigate(['/login']);
    }
  }

  goToLogin() {
    this.router.navigate(['/home']); // Chuyển hướng sang đăng nhập
  }
}
