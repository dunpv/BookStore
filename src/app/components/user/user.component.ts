import { Component, computed, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  private accountService = inject(AccountService);
  private router = inject(Router);

  user = computed(() => this.accountService.getUser());

  constructor() {
    // ✅ Nếu chưa đăng nhập, chuyển hướng về trang đăng nhập
    if (!this.user()) {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.accountService.logout();
    this.router.navigate(['/login']); // Chuyển hướng sau khi đăng xuất
  }
}
