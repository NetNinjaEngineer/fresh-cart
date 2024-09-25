import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { ShippingAddress } from '../interfaces/shippingAddress';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    private _baseUrl: string = 'https://ecommerce.routemisr.com/api/v1/orders';

    constructor(
        private _client: HttpClient,
        private _authenticationService: AuthenticationService
    ) {}

    createOnlineOrder(
        cartId: string | null,
        shippingAddress: ShippingAddress
    ): Observable<any> {
        return this._client.post(
            `${this._baseUrl}/checkout-session/${cartId}?url=http://localhost:4200`,
            shippingAddress
        );
    }
}
