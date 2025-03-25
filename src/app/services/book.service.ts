import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BookService {
  private books = signal([
    {
      id: 1,
      title: 'Dế Mèn Phiêu Lưu Ký',
      author: 'Tô Hoài',
      price: 50000,
      description: 'Một câu chuyện tình buồn...',
      image: 'assets/images/banner1.jpg', // Đường dẫn ảnh sách
      categoryId: 1,
    },
    {
      id: 2,
      title: 'Cha Giàu Cha Nghèo',
      author: 'Robert Kiyosaki',
      price: 150000,
      description: 'Một câu chuyện tình buồn...',
      image: 'assets/images/banner2.jpg', // Đường dẫn ảnh sách
      categoryId: 2,
    },
    {
      id: 3,
      title: 'Đắc Nhân Tâm',
      author: 'Dale Carnegie',
      price: 120000,
      description: 'Một câu chuyện tình buồn...',
      image: 'assets/images/banner1.jpg', // Đường dẫn ảnh sách
      categoryId: 3,
    },
    {
      id: 4,
      title: 'Harry Potter',
      author: 'J.K. Rowling',
      price: 200000,
      description: 'Một câu chuyện tình buồn...',
      image: 'assets/images/banner3.jpg', // Đường dẫn ảnh sách
      categoryId: 4,
    },
    {
      id: 5,
      title: 'Toán Học Cơ Bản',
      author: 'Nguyễn Văn A',
      price: 80000,
      description: 'Một câu chuyện tình buồn...',
      image: 'assets/images/banner1.jpg', // Đường dẫn ảnh sách
      categoryId: 2,
    },
    {
      id: 6,
      title: 'Harry Potter LK',
      author: 'J.K. Rowling',
      price: 200000,
      description: 'Một câu chuyện tình buồn...',
      image: 'assets/images/banner3.jpg', // Đường dẫn ảnh sách
      categoryId: 4,
    },
  ]);

  getBooks(categoryId?: number) {
    if (categoryId) {
      return this.books().filter((book) => book.categoryId === categoryId);
    }
    return this.books();
  }

  getBookById(id: number) {
    return this.books().find((b) => b.id === id);
  }

  private categories = [
    {
      id: 1,
      name: 'Văn học',
      description: 'Sách văn học hay',
      image: 'assets/category-vanhoc.jpg',
    },
    {
      id: 2,
      name: 'Khoa học',
      description: 'Sách khoa học',
      image: 'assets/category-khoahoc.jpg',
    },
    {
      id: 3,
      name: 'Đắc Nhân Tâm',
      description: 'Một câu chuyện tình buồn...',
      image: 'assets/images/banner1.jpg', // Đường dẫn ảnh sách
    },
    {
      id: 4,
      name: 'Harry Potter',
      description: 'Một câu chuyện tình buồn...',
      image: 'assets/images/banner3.jpg', // Đường dẫn ảnh sách
    },
    {
      id: 5,
      name: 'Toán Học Cơ Bản',
      description: 'Một câu chuyện tình buồn...',
      image: 'assets/images/banner1.jpg', // Đường dẫn ảnh sách
    },
  ];

  getCategories() {
    return this.categories;
  }

  addBook(book: {
    title: string;
    author: string;
    price: number;
    categoryId: number;
  }) {
    const newBook = {
      id: Date.now(),
      description: 'Mô tả chưa cập nhật', // Giá trị mặc định
      image: 'assets/images/default.jpg', // Ảnh mặc định
      ...book,
    };

    this.books.set([...this.books(), newBook]); // Cập nhật danh sách
  }

  deleteBook(index: number) {
    const updatedBooks = [...this.books()];
    if (index >= 0 && index < updatedBooks.length) {
      updatedBooks.splice(index, 1); // Xóa sách theo index
      this.books.set(updatedBooks); // Cập nhật danh sách sách
    }
  }

  // updateBook(updatedBook: Book) {
  //   const books = this.books().map((book) =>
  //     book.id === updatedBook.id ? updatedBook : book
  //   );
  //   this.books.set(books);
  // }
}
