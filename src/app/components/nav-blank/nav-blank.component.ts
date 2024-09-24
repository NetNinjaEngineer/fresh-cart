import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../../core/service/authentication.service';
import { CartService } from '../../core/service/cart.service';

@Component({
    selector: 'app-nav-blank',
    standalone: true,
    imports: [RouterModule],
    templateUrl: './nav-blank.component.html',
    styleUrl: './nav-blank.component.css',
})
export class NavBlankComponent  implements OnInit{

    numOfCartItems?: number | null = null;

    constructor(
        private _authenticationService: AuthenticationService,
        private _cartService: CartService) {}

    ngOnInit(): void {
        this._cartService.getLoggedInUserCart().subscribe({
            next: (response) => {
                if (response.status == 'success') {
                    this.numOfCartItems = response.numOfCartItems;
                }
            }
        })

        this._cartService.getCartNumber().subscribe({
            next: (cartNumber) => {
                if (cartNumber != null) {
                    this.numOfCartItems = cartNumber;
                }
            }
        })

    }

    signOut(): void {
        this._authenticationService.signOut();
    }
}
