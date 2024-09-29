import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormControlOptions, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { ChangePasswordRequest } from '../../core/interfaces/changePasswordRequest';
import { AuthenticationService } from '../../core/service/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
   selector: 'app-change-password',
   standalone: true,
   imports: [ReactiveFormsModule, CommonModule],
   templateUrl: './change-password.component.html',
   styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {

   passwordForm: FormGroup = new FormGroup({
      currentPassword: new FormControl(['', Validators.required, Validators.pattern(/^[a-zA-Z0-9@]{6,}$/)]),
      password: new FormControl(['', Validators.required, Validators.pattern(/^[a-zA-Z0-9@]{6,}$/)]),
      rePassword: new FormControl(['', Validators.required])
   }, {
      validators: [this.confirmPassword]
   } as FormControlOptions);

   constructor(
      private _authService: AuthenticationService,
      private _toastrService: ToastrService) { }

   onChangePassword() {
      if (this.passwordForm.valid) {
         const updatedDetails: ChangePasswordRequest = this.passwordForm.value as ChangePasswordRequest

         this._authService.changePassword(updatedDetails).subscribe({
            next: (response) => {
               if (response.message == 'success') {
                  this._toastrService.success(`Welcome ${response.user.name}, Your password modified successfully.`);
               }
            },
            error: (e: HttpErrorResponse) => {
               this._toastrService.error(e.error.errors.msg);
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

   resetForm() {
      this.passwordForm.reset();
   }
}
