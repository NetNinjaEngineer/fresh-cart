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

   getSpecificSubcategory(subcategoryId: string): Observable<{data: Subcategory}> {
      return this._client.get<{data: Subcategory}>(`${this._subCategoriesUrl}/${subcategoryId}`);
   }

   getAllSubcategoriesInCategory(categoryId: string): Observable<Pagination<Subcategory>> {
      return this._client.get<Pagination<Subcategory>>(`${this._baseUrl}/${categoryId}/subcategories`);
   }

}
