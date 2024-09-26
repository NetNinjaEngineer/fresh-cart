import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryService } from '../../core/service/category.service';
import { Pagination } from '../../core/interfaces/pagination';
import { Category } from '../../core/interfaces/Category';
import { HttpErrorResponse } from '@angular/common/http';
import { map, Subscription, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Subcategory } from '../../core/interfaces/Subcategory';
import { ProductService } from '../../core/service/product.service';
import { Product } from '../../core/interfaces/product';
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
   pagedCategories: Pagination<Category> = {} as Pagination<Category>;
   pagedCategoriesSubscription!: Subscription;
   subCategories: Subcategory[] = [];
   loadedProducts: Product[] = [];
   loadedProductsCount: number = 0;
   currentSubCategoryName: string = '';
   message: string = '';

   constructor(
      private _categoryService: CategoryService,
      private _productService: ProductService) { }

   ngOnDestroy(): void {
      this.pagedCategoriesSubscription.unsubscribe();
   }

   ngOnInit(): void {
      this.pagedCategoriesSubscription = this._categoryService
         .getPaginatedCategories().subscribe({
            next: (pagedCategories: Pagination<Category>) => {
               this.pagedCategories = pagedCategories;
            },
            error: (error: HttpErrorResponse) => {
               console.log(error)
            }
         })
   }


   loadProductsInSubCategory(categoryId: string) {
      this._categoryService.getSpecificSubcategory(categoryId).pipe(
         switchMap((response) => {
            const subCategory: Subcategory = response.data;
            this.currentSubCategoryName = subCategory.name;
            return this._productService.getAllProducts().pipe(
               map((products: Product[]) => {
                  return products.filter(product =>
                     product.subcategory.some(subCat => subCat._id === subCategory._id)
                  );
               })
            );
         })
      ).subscribe({
         next: (filteredProducts: Product[]) => {
            console.log(filteredProducts);
            this.loadedProducts = filteredProducts;
            this.loadedProductsCount = filteredProducts.length;
            if (this.loadedProducts.length === 0) {
               this.message = `No available products in ${this.currentSubCategoryName} category.`;
            }
         },
         error: (error) => {
            console.error('Error loading products or subcategory', error);
         }
      });
   }

}
