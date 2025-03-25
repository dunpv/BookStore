import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
// import { BookListComponent } from './book-list/book-list.component';
// import { BookDetailComponent } from './book-detail/book-detail.component';

@Component({
  selector: 'app-root',
  standalone: true, // ✅ Cần có nếu dùng `imports`
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'], // ✅ Đúng cú pháp
})
export class AppComponent {
  selectedBookId = signal<number | null>(null);

  viewBookDetail(bookId: number) {
    this.selectedBookId.set(bookId);
  }
}
