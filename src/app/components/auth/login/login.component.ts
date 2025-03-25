import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccountService } from './../../../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private accountService = inject(AccountService);
  private router = inject(Router);

  email = signal('');
  password = signal('');

  login() {
    if (!this.accountService.login(this.email(), this.password())) {
      this.password.set('');
      alert('Đăng nhập thất bại!');
    }
  }

  goToRegister() {
    this.router.navigate(['/register']); // Chuyển hướng sang đăng ký
  }
}
