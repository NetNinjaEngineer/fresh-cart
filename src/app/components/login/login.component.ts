import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import {
   FormControl,
   FormGroup,
   ReactiveFormsModule,
   Validators,
} from '@angular/forms';
import { AuthenticationService } from '../../core/service/authentication.service';
import { LoginRequest } from '../../core/interfaces/loginRequest';
import { Subscription } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
   selector: 'app-login',
   standalone: true,
   imports: [CommonModule, ReactiveFormsModule, RouterLink],
   templateUrl: './login.component.html',
   styleUrl: './login.component.css',
})
export class LoginComponent implements OnDestroy {
   errorMessage: string = '';
   loginSubscription?: Subscription;
   isloading: boolean = false;
   constructor(
      private _authenticationService: AuthenticationService,
      private _router: Router
   ) { }

   loginForm: FormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
         Validators.required,
         Validators.pattern(/^[a-zA-Z0-9@]{6,}$/),
      ]),
   });

   handleForm(): void {
      if (this.loginForm.valid) {
         const loginRequest = this.loginForm.value as LoginRequest;
         this.isloading = true;
         this.loginSubscription = this._authenticationService
            .login(loginRequest)
            .subscribe({
               next: (response) => {
                  if (response.message === 'success') {
                     this._authenticationService.saveUserToken(
                        response.token
                     );
                     this._router.navigate(['/home']);
                     this.isloading = false;
                  }
               },
               error: (err: HttpErrorResponse) => {
                  this.errorMessage = err.error.message;
                  this.isloading = false;
               },
            });
      }
   }

   ngOnDestroy(): void {
      this.loginSubscription?.unsubscribe();
   }
}
