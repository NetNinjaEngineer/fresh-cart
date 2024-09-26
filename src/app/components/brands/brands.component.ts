import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../../core/service/brands.service';
import { Pagination } from '../../core/interfaces/pagination';
import { Brand } from '../../core/interfaces/Brand';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterLink } from '@angular/router';

@Component({
   selector: 'app-brands',
   standalone: true,
   imports: [CommonModule, NgxPaginationModule, RouterLink],
   templateUrl: './brands.component.html',
   styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit {
   brands: Brand[] = [];
   pageSize!: number;
   currentPage!: number;
   total!: number;

   constructor(private _brandService: BrandsService) { }

   ngOnInit(): void {
      this._brandService.getAllBrands().subscribe({
         next: (pagedBrands: Pagination<Brand>) => {
            this.brands = pagedBrands.data;
         },
         error: (e: HttpErrorResponse) => {
            console.error(e);
         }
      })
   }

   pageChanged(pageNumber: number) {
      this._brandService.getAllBrands(pageNumber).subscribe({
         next: (response) => {
            this.total = response.results;
            this.brands = response.data;
            this.currentPage = response.metadata.currentPage;
            this.pageSize = response.metadata.limit;

         },
         error: (err: HttpErrorResponse) => {
            console.error(err);
         },
      });
   }

}
