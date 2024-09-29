import { Component, OnInit } from '@angular/core';
import {
   FormControl,
   FormGroup,
   ReactiveFormsModule,
   Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../core/service/order.service';
import { ShippingAddress } from '../../core/interfaces/shippingAddress';
import { CommonModule } from '@angular/common';

@Component({
   selector: 'app-checkout',
   standalone: true,
   imports: [ReactiveFormsModule, CommonModule],
   templateUrl: './checkout.component.html',
   styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
   basketId: string | null = null;

   checkoutForm: FormGroup = new FormGroup({
      details: new FormControl(''),
      city: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
   });

   constructor(
      private _activatedRoute: ActivatedRoute,
      private _orderService: OrderService) { }

   ngOnInit(): void {
      this._activatedRoute.paramMap.subscribe({
         next: (params) => {
            if (params.has('id')) {
               this.basketId = params.get('id');
            }
         },
      });
   }


   handleForm(): void {
      if (this.checkoutForm.valid) {
         if (this.basketId != null) {
            const shippingAddress = this.checkoutForm.value as ShippingAddress;
            this._orderService.createOnlineOrder(this.basketId, shippingAddress).subscribe({
               next: (response) => {
                  if (response.status == 'success') {
                     window.open(response.session.url, '_self');
                  }
               }
            })
         }
      }
   }
}
