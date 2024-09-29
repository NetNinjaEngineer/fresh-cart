import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderService } from '../../core/service/order.service';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../core/service/authentication.service';
import { Order } from '../../core/interfaces/order';
import { CommonModule } from '@angular/common';

@Component({
   selector: 'app-all-orders',
   standalone: true,
   imports: [CommonModule],
   templateUrl: './all-orders.component.html',
   styleUrl: './all-orders.component.css'
})
export class AllOrdersComponent implements OnInit, OnDestroy {
   ordersSubscribtion?: Subscription;
   ordersCount: number = 0;
   allOrders: Order[] = [];

   constructor(private _ordersService: OrderService, private _authService: AuthenticationService) { }

   ngOnInit(): void {
      const userInfo: any = this._authService.getCurrentUserInfo();
      if (userInfo.id !== null) {
         this.ordersSubscribtion = this._ordersService.getCurrentUserOrders(userInfo.id)
            .subscribe({
               next: (orders) => {
                  this.ordersCount = orders.length;
                  this._ordersService.ordersCount.next(orders.length);
                  this.allOrders = orders as Order[];
                  console.log(this.allOrders);

               }
            })
      }
   }

   ngOnDestroy(): void {
      this.ordersSubscribtion?.unsubscribe();
   }

}
