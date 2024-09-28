import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BrandsService } from '../../core/service/brands.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../../core/interfaces/product';
import { CommonModule } from '@angular/common';
import { TrimTextPipe } from '../../core/pipes/trim-text.pipe';
@Component({
   selector: 'app-shop-with-brand',
   standalone: true,
   imports: [CommonModule, RouterLink, TrimTextPipe],
   templateUrl: './shop-with-brand.component.html',
   styleUrl: './shop-with-brand.component.css'
})
export class ShopWithBrandComponent implements OnInit {
   allProducts?: Product[];
   constructor(
      private _activatedRoute: ActivatedRoute,
      private _brandsService: BrandsService) { }

   ngOnInit(): void {
      this._activatedRoute.paramMap.subscribe({
         next: (params) => {
            if (params.has('brandId')) {
               const brandId: any = params.get('brandId');
               this._brandsService.getProductsByBrandId(brandId).subscribe({
                  next: (productsWithBrand) => {
                     this.allProducts = productsWithBrand;
                  }
               })
            }
         }, error: (e: HttpErrorResponse) => {
         }
      })
   }
}
