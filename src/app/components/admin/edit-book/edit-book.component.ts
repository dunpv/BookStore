import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../../services/book.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss'],
})
export class EditBookComponent {
  private bookService = inject(BookService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  book = signal({
    id: 0,
    title: '',
    author: '',
    price: 0,
    description: '',
    image: '',
    categoryId: 0,
  });

  constructor() {
    const bookId = Number(this.route.snapshot.paramMap.get('id'));
    const foundBook = this.bookService.getBookById(bookId);
    if (foundBook) {
      this.book.set({ ...foundBook });
    } else {
      console.error('Book not found!');
      this.router.navigate(['/admin']); // Redirect to admin page if book not found
    }
  }

  saveBook() {
    this.bookService.updateBook(this.book());
    this.router.navigate(['/admin']);
  }

  cancel() {
    this.router.navigate(['/admin']);
  }
}
