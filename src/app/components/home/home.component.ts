import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductService } from '../../core/service/product.service';
import { CategoryService } from '../../core/service/category.service';
import { CartService } from '../../core/service/cart.service';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from '../../core/interfaces/Category';
import { Product } from '../../core/interfaces/product';
import { HttpErrorResponse } from '@angular/common/http';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { TrimTextPipe } from '../../core/pipes/trim-text.pipe';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
        private _toasterService: ToastrService
    ) {}

    ngOnDestroy(): void {
        this.productSubscribtion?.unsubscribe();
        this.categorySubscribtion?.unsubscribe();
    }

    ngOnInit(): void {
        this.productSubscribtion = this._productService
            .getAllProducts()
            .subscribe({
                next: (response) => {
                    this.products = response.data;
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

    AddToCart(productId: string) {
        this._cartService.addProductToCart(productId).subscribe({
            next: (response) => {
                console.log(response);
                if (response.status === 'success') {
                    this.isLoading = false;
                    this._toasterService.success(response.message);
                }
            },
            error: (err: HttpErrorResponse) => {
                console.error(err);
            },
        });
    }
}
