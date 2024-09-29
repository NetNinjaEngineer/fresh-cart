import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Pagination } from '../interfaces/pagination';
import { Brand } from '../interfaces/Brand';
import { Product } from '../interfaces/product';

@Injectable({
   providedIn: 'root'
})
export class BrandsService {
   private _baseUrl: string = `${environment.baseApiUrl}/api/v1/brands`;
   constructor(private _client: HttpClient) { }

   getAllBrands(_pageNumber: number = 1, _limit: number = 40): Observable<Pagination<Brand>> {
      return this._client.get<Pagination<Brand>>(`${this._baseUrl}?page=${_pageNumber}&limit=${_limit}`);
   }

   getProductsByBrandId(_brandId: string): Observable<Product[]> {
      return this._client.get<Pagination<Product>>(`${environment.baseApiUrl}/api/v1/products`).pipe(
         map(pagedProducts => pagedProducts.data.filter(p => p.brand._id === _brandId)),
         catchError(error => {
            console.error(error);
            return of([])
         })
      )
   }
}
