import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrandsService } from '../../core/service/brands.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
   selector: 'app-shop-with-brand',
   standalone: true,
   imports: [],
   templateUrl: './shop-with-brand.component.html',
   styleUrl: './shop-with-brand.component.css'
})
export class ShopWithBrandComponent implements OnInit {
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
                     console.log(productsWithBrand);
                  }
               })
            }
         }, error: (e: HttpErrorResponse) => {
            console.error(e);
         }
      })
   }
}
