import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, mergeMap, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Pagination } from '../interfaces/pagination';
import { Category } from '../interfaces/Category';
import { Subcategory } from '../interfaces/Subcategory';

@Injectable({
   providedIn: 'root',
})
export class CategoryService {
   private _baseUrl: string = `${environment.baseApiUrl}/api/v1/categories`;
   private _subCategoriesUrl: string = `${environment.baseApiUrl}/api/v1/subcategories`;

   constructor(private _client: HttpClient) { }

   getAllCategories(): Observable<Pagination<Category>> {
      return this._client.get<Pagination<Category>>(`${this._baseUrl}`);
   }

   getPaginatedCategories(
      _pageNumber: number = 1,
      _limit: number = 40
   ): Observable<Pagination<Category>> {
      return this._client
         .get<Pagination<Category>>(`${this._baseUrl}?page=${_pageNumber}&limit=${_limit}`)
         .pipe(
            mergeMap(pagedCategories => {
               const categoriesWithSubCategories$: Observable<Category[]> = forkJoin(
                  pagedCategories.data.map(category =>
                     this._client
                        .get<Pagination<Subcategory>>(`${this._baseUrl}/${category._id}/subcategories`)
                        .pipe(
                           map(pagedSubCategories => {
                              category.subCategories = pagedSubCategories.data;
                              return category;
                           }),
                           catchError(error => {
                              console.error(error);
                              category.subCategories = [];
                              return of(category);
                           })
                        )
                  )
               );

               return categoriesWithSubCategories$.pipe(
                  map(categories => ({
                     ...pagedCategories,
                     data: categories
                  }))
               );
            }),
            catchError(error => {
               console.error(error);
               return of();
            })
         );
   }

   getSpecificSubcategory(subcategoryId: string): Observable<{data: Subcategory}> {
      return this._client.get<{data: Subcategory}>(`${this._subCategoriesUrl}/${subcategoryId}`);
   }

}
