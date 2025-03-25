import { Component, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], // ✅ Thêm vào đây
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent {
  private bookService = inject(BookService);
  router = inject(Router);

  books = signal<any[]>([]);
  categories = signal<any[]>([]);
  searchTerm = signal<string>('');
  selectedCategoryId = signal<number | null>(null);

  constructor() {
    this.books.set(this.bookService.getBooks());
    this.categories.set(this.bookService.getCategories());
  }

  // Danh sách sách sau khi lọc theo danh mục và tìm kiếm
  filteredBooks = computed(() =>
    this.books().filter(
      (book) =>
        (!this.selectedCategoryId() ||
          book.categoryId === this.selectedCategoryId()) &&
        (!this.searchTerm() ||
          book.title.toLowerCase().includes(this.searchTerm().toLowerCase()))
    )
  );

  // Chọn danh mục để lọc
  filterByCategory(categoryId: number | null) {
    this.selectedCategoryId.set(categoryId);
  }
}
