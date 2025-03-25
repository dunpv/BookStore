import { Component, inject, computed, Signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  private accountService = inject(AccountService);

  // ✅ Sử dụng computed để lấy dữ liệu từ Signal trong AccountService
  user: Signal<{
    name: string;
    email: string;
    phone: string;
    address?: string;
  } | null> = computed(() => this.accountService.getUser());

  logout() {
    this.accountService.logout();
  }
}
