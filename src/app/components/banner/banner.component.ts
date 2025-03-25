import { Component, OnInit, OnDestroy  } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit, OnDestroy{
  images = ['assets/banner1.jpg', 'assets/banner2.jpg', 'assets/banner3.jpg'];
  currentIndex = 0;
  intervalId: any;

  ngOnInit() {
    this.intervalId = setInterval(() => this.nextSlide(), 3000); // Tự động chuyển ảnh mỗi 3 giây
  }

  
  ngOnDestroy() {
    clearInterval(this.intervalId); // Xóa interval khi component bị hủy để tránh lỗi memory leak
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
  }
}
