import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/service/cart.service';
import { Cart } from '../../core/interfaces/Cart';
import { CommonModule } from '@angular/common';
import { TrimTextPipe } from '../../core/pipes/trim-text.pipe';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [CommonModule, TrimTextPipe, RouterModule],
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
    shoppingCart: Cart | null = null;
    constructor(private _cartService: CartService, private _router: Router) {}

    ngOnInit(): void {
        this._cartService.getLoggedInUserCart().subscribe({
            next: (response) => {
                this.shoppingCart = response;
                console.log(this.shoppingCart);
            },
        });
    }

    onIncrement(counter: any): void {
        counter.innerHTML = Number(counter.innerHTML) + 1;
    }

    onDecrement(counter: any): void {
        if (counter.innerHTML > 0) {
            counter.innerHTML = Number(counter.innerHTML) - 1;
        }
    }

    disableDecrement(counter: HTMLSpanElement): boolean {
        return Number(counter.innerHTML) == 1;
    }

    continueShopping() {
        this._router.navigate(['/products']);
    }

    updateCart() {
        let allQuantitiesElements = document.querySelectorAll('.counter');
        allQuantitiesElements.forEach((ele) => {
            this._cartService
                .updateCartProductQuantity(ele.id, Number(ele.innerHTML))
                .subscribe({
                    next: (response) => {
                        console.log(response);
                    },
                });
        });
    }

    clearCart() {
        this._cartService.clearUserCart().subscribe({
            next: (response) => {
                console.log(response);
            },
        });
    }

    removeFromCart(id: string) {
        this._cartService.removeProductFromCart(id).subscribe({
            next: (response) => {
                console.log(response)
            }
        })
    }
}
