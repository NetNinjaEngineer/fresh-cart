import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
   providedIn: 'root'
})
export class WishListService {
   private _baseUrl: string = environment.baseApiUrl;
   constructor(private _client: HttpClient) { }

   addProductToWishlist(productId: string): Observable<any> {
      return this._client.post(`${this._baseUrl}/api/v1/wishlist`, {
         "productId": productId
      });
   }

   removeProductFromWishlist(productId: string): Observable<any> {
      return this._client.delete(`${this._baseUrl}/api/v1/wishlist/${productId}`);
   }

   getLoggedInUserWishlist(): Observable<any> {
      return this._client.get(`${this._baseUrl}/api/v1/wishlist`);
   }
}
