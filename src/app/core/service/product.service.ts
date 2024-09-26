import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Pagination } from '../interfaces/pagination';
import { Product } from '../interfaces/product';

@Injectable({
   providedIn: 'root',
})
export class ProductService {
   private _baseUrl: string = `${environment.baseApiUrl}/api/v1/products`;
   constructor(private _client: HttpClient) { }

   getAllProducts(): Observable<Product[]> {
      return this._client.get<Pagination<Product>>(`${this._baseUrl}`).pipe(
         map(res => res.data),
         catchError(error => {
            console.log(error)
            return of([]);
         })
      );
   }

   getPaginatedProducts(_pageNumber: number = 1, _limit: number = 40): Observable<Pagination<Product>> {
      return this._client
         .get<Pagination<Product>>(`${this._baseUrl}?page=${_pageNumber}&limit=${_limit}`).pipe(
            catchError(error => {
               console.error(error)
               return of()
            })
         )
   }

   getSpecificProduct(id: string): Observable<any> {
      return this._client.get<any>(`${this._baseUrl}/${id}`).pipe(
         tap(response => console.log(response))
      );
   }

}
