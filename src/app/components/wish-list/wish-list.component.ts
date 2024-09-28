import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WishListService } from '../../core/service/wish-list.service';
import { Product } from '../../core/interfaces/product';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/service/cart.service';

@Component({
   selector: 'app-wish-list',
   standalone: true,
   imports: [CommonModule],
   templateUrl: './wish-list.component.html',
   styleUrl: './wish-list.component.css'
})
export class WishListComponent implements OnInit {
   wishlistData?: Product[];
   constructor(private _wishListService: WishListService,
      private _toastrService: ToastrService,
      private _cartService: CartService) { }

   ngOnInit(): void {
      this._wishListService.getLoggedInUserWishlist().subscribe({
         next: (response) => {
            this.wishlistData = response.data;
         }
      })
   }
   removeFromWishlist(productId: string) {
      this._wishListService.removeProductFromWishlist(productId).subscribe({
         next: (response) => {
            if (response.status == 'success') {
               this._wishListService.getLoggedInUserWishlist().subscribe({
                  next: (response) => {
                     this.wishlistData = response.data;
                     this._wishListService.wishListItemsCount.next(response.data.length);
                  }
               })
               this._toastrService.success(response.message);
            }
         }
      })
   }

   addToCart(productId: string) {
      this._cartService.addProductToCart(productId).subscribe({
         next: (response) => {
            if (response.status === 'success') {
               this._toastrService.success(response.message);
               this._cartService.setCartNumber(response.numOfCartItems);
            }
         }
      });
   }
}
