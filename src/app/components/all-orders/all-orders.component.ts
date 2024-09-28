import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderService } from '../../core/service/order.service';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../core/service/authentication.service';

@Component({
   selector: 'app-all-orders',
   standalone: true,
   imports: [],
   templateUrl: './all-orders.component.html',
   styleUrl: './all-orders.component.css'
})
export class AllOrdersComponent implements OnInit, OnDestroy {
   ordersSubscribtion?: Subscription;
   constructor(private _ordersService: OrderService, private _authService: AuthenticationService) { }

   ngOnInit(): void {
      const userInfo: any = this._authService.getCurrentUserInfo();
      this.ordersSubscribtion = this._ordersService.getCurrentUserOrders(userInfo.id)
         .subscribe({
            next: (response) => {
               console.log(response);
            }
         })
   }

   ngOnDestroy(): void {
      this.ordersSubscribtion?.unsubscribe();
   }

}
