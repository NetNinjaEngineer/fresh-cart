import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CartService {
    private _baseUrl: string = 'https://ecommerce.routemisr.com/api/v1/cart';

    constructor(private _client: HttpClient) {}

    addProductToCart(productId: string): Observable<any> {
        return this._client.post<any>(this._baseUrl, { productId: productId });
    }

    getLoggedInUserCart(): Observable<any> {
        return this._client.get<any>(this._baseUrl);
    }

    removeProductFromCart(productId: string): Observable<any> {
        return this._client.delete<any>(`${this._baseUrl}/${productId}`);
    }

    updateCartProductQuantity(
        productId: string,
        count: number
    ): Observable<any> {
        return this._client.put(`${this._baseUrl}/${productId}`, {
            count: count,
        });
    }
}
