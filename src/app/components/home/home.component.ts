import { Component, inject, signal, computed } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';
// import { BannerComponent } from '../banner/banner.component';
import { CategoryService } from '../../services/category.service';
import { CategoryComponent } from '../category/category.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, CategoryComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private bookService = inject(BookService);
  private router = inject(Router);
  private categoryService = inject(CategoryService);

  books = signal(this.bookService.getBooks());
  categories = signal(this.categoryService.getCategories());

  searchQuery = signal('');
  selectedCategoryId = signal<number | null>(null);

  // Lọc danh sách sách theo từ khóa
  filteredBooks = computed(() => {
    return this.books()
      .filter((book) =>
        book.title
          .toLowerCase()
          .includes(this.searchQuery().trim().toLowerCase())
      )
      .filter((book) =>
        this.selectedCategoryId()
          ? book.categoryId === this.selectedCategoryId()
          : true
      );
  });

  // Chuyển trang đến chi tiết sách
  goToBookDetail(bookId: number) {
    this.router.navigate(['/book', bookId]);
  }

  filterByCategory(categoryId: number) {
    this.selectedCategoryId.set(categoryId);
  }
}
