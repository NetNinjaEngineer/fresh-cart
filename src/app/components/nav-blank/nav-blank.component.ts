import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../../core/service/authentication.service';
import { CartService } from '../../core/service/cart.service';
import { ScrollDirective } from '../../core/directives/scroll.directive';
import { WishListService } from '../../core/service/wish-list.service';
import { OrderService } from '../../core/service/order.service';

@Component({
   selector: 'app-nav-blank',
   standalone: true,
   imports: [RouterModule, ScrollDirective],
   templateUrl: './nav-blank.component.html',
   styleUrl: './nav-blank.component.css',
})
export class NavBlankComponent implements OnInit {

   numOfCartItems?: number | null = null;
   numOfWishlistItems?: number | null = null;
   numOfOrders?: number | null = null;

   constructor(
      private _authenticationService: AuthenticationService,
      private _cartService: CartService,
      private _wishlistService: WishListService,
      private _orderService: OrderService
   ) { }

   ngOnInit(): void {
      this._cartService.getLoggedInUserCart().subscribe({
         next: (response) => {
            if (response.status == 'success') {
               this.numOfCartItems = response.numOfCartItems;
            }
         }
      })

      this._wishlistService.getLoggedInUserWishlist().subscribe({
         next: (response) => {
            this.numOfWishlistItems = response.data.length;
         }
      })

      this._cartService.getCartNumber().subscribe({
         next: (cartNumber) => {
            if (cartNumber != null) {
               this.numOfCartItems = cartNumber;
            }
         }
      })

      this._wishlistService.wishListItemsCount.subscribe({
         next: (itemsCount) => {
            this.numOfWishlistItems = itemsCount;
         }
      })


      this._orderService.ordersCount.subscribe({
         next: (itemsCount) => {
            this.numOfOrders = itemsCount;
         }
      })

   }

   signOut(): void {
      this._authenticationService.signOut();
   }
}
