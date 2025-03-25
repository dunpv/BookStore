import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../../services/book.service';
import { Router } from '@angular/router'; // Đảm bảo bạn đã import Routerimport { RouterModule } from '@angular/router';
import { RouterModule } from '@angular/router';

export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  categoryId: number;
}

@Component({
  selector: 'app-book-management',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './book-management.component.html',
  styleUrls: ['./book-management.component.scss'],
})
export class BookManagementComponent implements OnInit {
  private bookService = inject(BookService);
  private router = inject(Router); // Đảm bảo đã inject Router
  books = signal(this.bookService.getBooks());

  searchText = signal(''); // Tạo signal cho searchText

  ngOnInit(): void {
    // Có thể thêm logic lấy sách từ service tại đây nếu cần
  }

  // Tìm kiếm sách theo tiêu đề
  searchBooks() {
    const text = this.searchText(); // Lấy giá trị của searchText
    if (text) {
      this.books.set(
        this.bookService
          .getBooks()
          .filter((book) =>
            book.title.toLowerCase().includes(text.toLowerCase())
          )
      );
    } else {
      this.books.set(this.bookService.getBooks()); // Nếu không có searchText thì hiển thị tất cả
    }
  }

  openAddBookModal() {
    console.log('Mở modal thêm sách');
    // Thực hiện thêm sách hoặc mở modal tùy theo yêu cầu của bạn
  }

  // Dữ liệu mới cho sách
  newBook = signal<{
    title: string;
    author: string;
    price: number;
    categoryId: number;
  }>({
    title: '',
    author: '',
    price: 0,
    categoryId: 1, // Giá trị mặc định hợp lệ
  });

  // Phương thức lọc sách theo searchText
  filteredBooks() {
    return this.books().filter(
      (book) =>
        book.title.toLowerCase().includes(this.searchText().toLowerCase()) ||
        book.author.toLowerCase().includes(this.searchText().toLowerCase())
    );
  }

  // Thêm sách
  addBook() {
    if (
      !this.newBook().title ||
      !this.newBook().author ||
      this.newBook().price <= 0
    ) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }
    this.bookService.addBook(this.newBook());
    this.books.set(this.bookService.getBooks());
    this.newBook.set({ title: '', author: '', price: 0, categoryId: 1 });
  }

  // Chỉnh sửa sách
  editBook(book: Book) {
    this.router.navigate(['/admin/edit-book', book.id]);
  }

  // Xóa sách
  deleteBook(index: number) {
    this.bookService.deleteBook(index);
    this.books.set(this.bookService.getBooks());
  }
}
