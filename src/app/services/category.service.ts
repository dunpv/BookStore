import { Injectable } from '@angular/core';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categories = signal([
    {
      id: 1,
      name: 'Văn học',
      description: 'Những tác phẩm văn học kinh điển và hiện đại',
      image: 'assets/categories/IMG_2538.JPG',
    },
    {
      id: 2,
      name: 'Kinh tế',
      description: 'Sách về tài chính, đầu tư, quản lý kinh tế',
      image: 'assets/categories/IMG_2539.JPG',
    },
    {
      id: 3,
      name: 'Tâm lý - Kỹ năng sống',
      description: 'Những quyển sách giúp cải thiện tư duy và kỹ năng mềm',
      image: 'assets/categories/Anh-anime-cute-1-504x600.jpg',
    },
    {
      id: 4,
      name: 'Thiếu nhi',
      description: 'Sách dành cho trẻ em, truyện tranh, truyện cổ tích',
      image: 'assets/categories/IMG_2539.JPG',
    },
    {
      id: 5,
      name: 'Giáo khoa - Tham khảo',
      description: 'Sách giáo khoa, tài liệu học tập, ôn thi',
      image: 'assets/categories/IMG_2538.JPG',
    },
    {
      id: 6,
      name: 'Toán Học',
      description: 'Sách về khoa học, công nghệ, lập trình',
      image: 'assets/categories/IMG_2539.JPG',
    },
    {
      id: 7,
      name: 'Y học - Sức khỏe',
      description: 'Sách về y học, chăm sóc sức khỏe',
      image: 'assets/categories/IMG_2538.JPG',
    },
    {
      id: 8,
      name: 'Lịch sử - Địa lý',
      description: 'Sách lịch sử, địa lý, khám phá thế giới',
      image: 'assets/categories/IMG_2539.JPG',
    },
    {
      id: 9,
      name: 'Khoa học',
      description: 'Sách khoa học',
      image: 'assets/categories/IMG_2539.JPG',
    },
  ]);

  getCategories() {
    return this.categories();
  }

  getCategoryById(id: number) {
    return this.categories().find((category) => category.id === id);
  }
}
