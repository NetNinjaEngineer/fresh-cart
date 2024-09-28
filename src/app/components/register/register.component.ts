import { Component, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../../core/service/authentication.service';
import { AbstractControlOptions, FormControl, FormControlOptions, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterRequest } from '../../core/interfaces/registerRequest';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
   selector: 'app-register',
   standalone: true,
   imports: [
      ReactiveFormsModule,
      CommonModule
   ],
   templateUrl: './register.component.html',
   styleUrl: './register.component.css'
})
export class RegisterComponent implements OnDestroy {

   registerSubscription?: Subscription;
   errorMessage: string = '';
   isloading: boolean = false;

   registerForm: FormGroup = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9@]{6,}$/)]),
      rePassword: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
   }, {
      validators: [this.confirmPassword]
   } as FormControlOptions)

   constructor(
      private _authenticationService: AuthenticationService,
      private _router: Router) { }

   ngOnDestroy(): void {
      this.registerSubscription?.unsubscribe();
   }

   handleForm(): void {
      if (this.registerForm.valid) {
         this.isloading = true;
         let registerData = this.registerForm.value as RegisterRequest;
         this.registerSubscription = this._authenticationService.register(registerData).subscribe({
            next: (response) => {
               if (response.message === 'success') {
                  this._router.navigate(['/login'])
               }
            },
            error: (err: HttpErrorResponse) => {
               this.errorMessage = err.error.message;
               this.isloading = false;
            }
         })
      }
   }

   confirmPassword(formGroup: FormGroup): void {
      let password = formGroup.get('password');
      let rePassword = formGroup.get('rePassword');

      if (rePassword?.value == '') {
         rePassword?.setErrors({ required: true })
      }
      else if (password?.value !== rePassword?.value) {
         rePassword?.setErrors({ mismatch: true });
      }

   }

}
