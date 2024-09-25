import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CartService {
    private _baseUrl: string = `${environment.baseApiUrl}/api/v1/cart`;
    cartNumber: BehaviorSubject<number> = new BehaviorSubject(0);

    constructor(private _client: HttpClient) {}

    setCartNumber(cartNumber: number): void {
        this.cartNumber.next(cartNumber);
    }

    getCartNumber(): Observable<number> {
        return this.cartNumber.asObservable();
    }

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

    clearUserCart(): Observable<any> {
        return this._client.delete(this._baseUrl)
    }
}
