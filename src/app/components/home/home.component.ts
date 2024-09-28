import { CommonModule } from '@angular/common';
import { Component, Renderer2 } from '@angular/core';
import { ProductService } from '../../core/service/product.service';
import { CategoryService } from '../../core/service/category.service';
import { CartService } from '../../core/service/cart.service';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from '../../core/interfaces/Category';
import { Product } from '../../core/interfaces/product';
import { HttpErrorResponse } from '@angular/common/http';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { TrimTextPipe } from '../../core/pipes/trim-text.pipe';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../core/service/wish-list.service';

@Component({
   selector: 'app-home',
   standalone: true,
   imports: [
      CommonModule,
      RouterLink,
      CarouselModule,
      SearchPipe,
      TrimTextPipe,
      FormsModule,
   ],
   templateUrl: './home.component.html',
   styleUrl: './home.component.css',
})
export class HomeComponent {
   productSubscribtion?: Subscription;
   categorySubscribtion?: Subscription;
   products: Product[] = [];
   isLoading: boolean = false;
   categories: Category[] = [];
   searchTerm: string = '';

   categorySliderOptions: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      dots: true,
      navSpeed: 700,
      navText: ['', ''],
      autoplay: true,
      autoplaySpeed: 1000,
      autoplayTimeout: 2000,
      responsive: {
         0: {
            items: 1,
         },
         400: {
            items: 2,
         },
         740: {
            items: 3,
         },
         940: {
            items: 6,
         },
      },
      nav: false,
   };

   mainSliderOptions: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      dots: true,
      navSpeed: 700,
      navText: ['', ''],
      autoplay: true,
      autoplaySpeed: 1000,
      autoplayTimeout: 3000,
      items: 1,
      nav: false,
   };

   constructor(
      private _productService: ProductService,
      private _categoryService: CategoryService,
      private _cartService: CartService,
      private _toasterService: ToastrService,
      private _renderer2: Renderer2,
      private _wishListService: WishListService
   ) { }

   ngOnDestroy(): void {
      this.productSubscribtion?.unsubscribe();
      this.categorySubscribtion?.unsubscribe();
   }

   ngOnInit(): void {
      this.productSubscribtion = this._productService
         .getPaginatedProducts(2)
         .subscribe({
            next: (pagedProducts) => {
               this.products = pagedProducts.data
            },
            error: (err: HttpErrorResponse) => {
               console.error(err);
            },
         });

      this.categorySubscribtion = this._categoryService
         .getAllCategories()
         .subscribe({
            next: (response) => {
               this.categories = response.data;
            },
         });
   }

   AddToCart(productId: string, element: HTMLButtonElement) {
      this._renderer2.setAttribute(element, 'disabled', 'true');

      this._cartService.addProductToCart(productId).subscribe({
         next: (response) => {
            console.log(response);
            if (response.status === 'success') {
               this.isLoading = false;
               this._toasterService.success(response.message);
               this._renderer2.removeAttribute(element, 'disabled');
               this._cartService.setCartNumber(response.numOfCartItems);
            }
         },
         error: (err: HttpErrorResponse) => {
            console.error(err);
            this._renderer2.removeAttribute(element, 'disabled');
         },
      });
   }


   addProductToWishlist(productId: string, wishListBtn: any) {

      this._wishListService.getLoggedInUserWishlist().subscribe({
         next: (response) => {
            if (response.status == 'success') {
               const products = response.data as Product[];
               if (products.find(p => p._id === productId) != null) {
                  this._wishListService.removeProductFromWishlist(productId).subscribe({
                     next: (response) => {
                        if (response.status == 'success') {
                           this._toasterService.success(response.message);
                        }
                     }
                  })
               } else {

                  this._wishListService.addProductToWishlist(productId).subscribe({
                     next: (response) => {
                        if (response.status == 'success') {
                           this._wishListService.wishListItemsCount.next(response.data.length);
                           this._renderer2.addClass(wishListBtn, 'fa-solid')
                           this._renderer2.setStyle(wishListBtn, 'color', '#f2520d')
                           this._toasterService.success(response.message);
                        }
                     }
                  })
               }
            }
         }
      })

   }
}
