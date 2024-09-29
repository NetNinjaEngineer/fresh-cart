import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UpdateProfileRequest } from '../../core/interfaces/updateProfileRequest';
import { AuthenticationService } from '../../core/service/authentication.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
   selector: 'app-edit-profile',
   standalone: true,
   imports: [
      ReactiveFormsModule,
      CommonModule
   ],
   templateUrl: './edit-profile.component.html',
   styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
   accountForm: FormGroup;
   errorMessage: string = '';

   constructor(private fb: FormBuilder,
      private _authService: AuthenticationService,
      private _toastrService: ToastrService) {
      this.accountForm = this.fb.group({
         name: ['', Validators.required],
         email: ['', [Validators.required, Validators.email]],
         phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]]
      });
   }

   onSaveDetails() {
      if (this.accountForm.valid) {
         const updatedDetails = this.accountForm.value as UpdateProfileRequest;
         this._authService.updateUserProfile(updatedDetails).subscribe({
            next: (response) => {
               if (response.message === 'success') {
                  this._toastrService.success('Your Account Modified Successfully.')
               }
            },
            error: (e: HttpErrorResponse) => {
               this._toastrService.error(e.error.errors.msg);
            }
         })
      }
   }
}
