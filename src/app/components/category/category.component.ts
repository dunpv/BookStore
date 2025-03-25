import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
  private categoryService = inject(CategoryService);

  categories = signal(this.categoryService.getCategories());

  goToCategory(id: number) {
    console.log(`Chuyển đến danh mục có ID: ${id}`);
  }
}
