import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../core/service/category.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subcategory } from '../../core/interfaces/Subcategory';
import { CommonModule } from '@angular/common';

@Component({
   selector: 'app-sub-categories',
   standalone: true,
   imports: [CommonModule],
   templateUrl: './sub-categories.component.html',
   styleUrl: './sub-categories.component.css'
})
export class SubCategoriesComponent implements OnInit {
   subcategories?: Subcategory[];
   constructor(private _categoryService: CategoryService,
      private _activatedRoute: ActivatedRoute
   ) { }

   ngOnInit(): void {
      this._activatedRoute.paramMap.subscribe({
         next: (params) => {
            const categoryId: string | null = params.get('categoryId');
            if (categoryId != null) {
               this._categoryService.getAllSubcategoriesInCategory(categoryId).subscribe({
                  next: (response) => {
                     this.subcategories = response.data;
                  },
                  error: (e: HttpErrorResponse) => {
                  }
               })
            }
         }
      })


   }

}
