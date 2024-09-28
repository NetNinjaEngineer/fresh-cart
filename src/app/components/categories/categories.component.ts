import { Component, inject, Inject, OnDestroy, OnInit } from '@angular/core';
import { CategoryService } from '../../core/service/category.service';
import { Pagination } from '../../core/interfaces/pagination';
import { Category } from '../../core/interfaces/Category';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TrimTextPipe } from '../../core/pipes/trim-text.pipe';
import { RouterLink } from '@angular/router';

@Component({
   selector: 'app-categories',
   standalone: true,
   imports: [CommonModule, TrimTextPipe, RouterLink],
   templateUrl: './categories.component.html',
   styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit, OnDestroy {
   private _categoryService: CategoryService = inject(CategoryService);
   private _categorySubscribtion!: Subscription;
   categoryData: Category[] = [];

   ngOnDestroy(): void {
      this._categorySubscribtion.unsubscribe();
   }
   ngOnInit(): void {
      this._categorySubscribtion = this._categoryService
         .getAllCategories()
         .subscribe({
            next: (response: Pagination<Category>) => {
               this.categoryData = response.data;
            },
            error: (error: HttpErrorResponse) => {
            }
         })
   }


}
