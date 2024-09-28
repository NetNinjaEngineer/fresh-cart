import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../core/interfaces/product';
import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/service/cart.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
   selector: 'app-product-details',
   standalone: true,
   imports: [CommonModule, CarouselModule],
   templateUrl: './product-details.component.html',
   styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
   isLoading: boolean = false;
   productId: any;
   currentProduct: Product | null = null;

   productSliderOptions: OwlOptions = {
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

   constructor(
      private _productService: ProductService,
      private _activatedRoute: ActivatedRoute,
      private _cartService: CartService,
      private _toasterService: ToastrService,
      private _router: Router
   ) { }

   ngOnInit(): void {
      this._activatedRoute.paramMap.subscribe({
         next: (params) => {
            this.productId = params.get('id');
            if (this.productId != null) {
               this._productService
                  .getSpecificProduct(this.productId)
                  .subscribe({
                     next: (product) => {
                        this.currentProduct = product.data as Product;
                     },
                  });
            }
         },
      });
   }

   AddToCart(productId: string) {
      this.isLoading = true;
      this._cartService.addProductToCart(productId).subscribe({
         next: (response) => {
            if (response.status === 'success') {
               this._toasterService.success(response.message);
               this._cartService.setCartNumber(response.numOfCartItems);
               this.isLoading = false;
               this._router.navigate(['/cart']);
            }
         },
         error: (err: HttpErrorResponse) => {
            this.isLoading = false;
         },
      });
   }
}
