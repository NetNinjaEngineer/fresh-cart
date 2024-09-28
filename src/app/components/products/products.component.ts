import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../core/service/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Product } from '../../core/interfaces/product';
import { TrimTextPipe } from '../../core/pipes/trim-text.pipe';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/service/cart.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

@Component({
   selector: 'app-products',
   standalone: true,
   imports: [
      CommonModule,
      RouterLink,
      TrimTextPipe,
      SearchPipe,
      NgxPaginationModule,
      FormsModule
   ],
   templateUrl: './products.component.html',
   styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
   addProductToWishlist(arg0: string) {
      throw new Error('Method not implemented.');
   }
   searchTerm: string = '';
   pageChanged(pageNumber: number) {
      this._productService.getPaginatedProducts(pageNumber).subscribe({
         next: (response) => {
            this.products = response.data;
            this.currentPage = response.metadata.currentPage;
            this.pageSize = response.metadata.limit;
            this.total = response.results;
         },
         error: (err: HttpErrorResponse) => {
            console.error(err);
         },
      });
   }
   productSubscribtion?: Subscription;
   products: Product[] = [];
   pageSize!: number;
   currentPage!: number;
   total!: number;

   constructor(
      private _productService: ProductService,
      private _toasterService: ToastrService,
      private _cartService: CartService,
      private _renderer2: Renderer2
   ) { }

   ngOnInit(): void {
      this.productSubscribtion = this._productService
         .getPaginatedProducts()
         .subscribe({
            next: (response) => {
               this.products = response.data;
               this.currentPage = response.metadata.currentPage;
               this.pageSize = response.metadata.limit;
               this.total = response.results;
            },
            error: (err: HttpErrorResponse) => {
               console.error(err);
            },
         });
   }

   AddToCart(productId: string, element: HTMLButtonElement) {
      this._renderer2.setAttribute(element, 'disabled', 'true');

      this._cartService.addProductToCart(productId).subscribe({
         next: (response) => {
            console.log(response);
            if (response.status === 'success') {
               this._toasterService.success(response.message);
               this._renderer2.removeAttribute(element, 'disabled');
               this._cartService.setCartNumber(response.numOfCartItems);
            }
         },
         error: (err: HttpErrorResponse) => {
            this._renderer2.removeAttribute(element, 'disabled');
         },
      });
   }
}
