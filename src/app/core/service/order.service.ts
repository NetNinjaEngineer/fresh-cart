import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ShippingAddress } from '../interfaces/shippingAddress';
import { environment } from '../../../environments/environment';

@Injectable({
   providedIn: 'root',
})
export class OrderService {
   private _baseUrl: string = `${environment.baseApiUrl}/api/v1/orders`;
   private _clientUrl: string = environment.clientUrl;
   ordersCount: BehaviorSubject<number> = new BehaviorSubject(0);

   constructor(
      private _client: HttpClient
   ) { }

   createOnlineOrder(
      cartId: string | null,
      shippingAddress: ShippingAddress
   ): Observable<any> {
      return this._client.post(
         `${this._baseUrl}/checkout-session/${cartId}?url=${this._clientUrl}`,
         shippingAddress
      );
   }

   getCurrentUserOrders(userId: string): Observable<any> {
      return this._client.get(`${this._baseUrl}/user/${userId}`);
   }
}
