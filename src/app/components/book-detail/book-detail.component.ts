import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterModule, ParamMap } from '@angular/router';
import { BookService } from '../../services/book.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  standalone: true,
  styleUrls: ['./book-detail.component.scss'],
  imports: [CommonModule, RouterModule],
})
export class BookDetailComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private bookService = inject(BookService);
  private cartService = inject(CartService);

  book = signal<any>(null);
  private paramSub!: Subscription;

  ngOnInit() {
    this.paramSub = this.route.paramMap.subscribe((params: ParamMap) => {
      const bookId = Number(params.get('id'));
      if (!isNaN(bookId)) {
        this.book.set(this.bookService.getBookById(bookId));
      } else {
        this.book.set(null);
      }
    });
  }

  ngOnDestroy() {
    if (this.paramSub) {
      this.paramSub.unsubscribe();
    }
  }

  constructor() {
    const bookId = Number(this.route.snapshot.paramMap.get('id'));
    const foundBook = this.bookService.getBookById(bookId);

    if (foundBook) {
      this.book.set(foundBook);
    } else {
      console.error('Không tìm thấy sách!');
    }
  }

  addToCart() {
    if (this.book()) {
      this.cartService.addToCart(this.book());
      alert('Đã thêm vào giỏ hàng!');
    }
  }
}
