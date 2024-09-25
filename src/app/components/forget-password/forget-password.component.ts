import { Component, ElementRef, Renderer2, ViewChild, viewChild } from '@angular/core';
import { AuthenticationService } from '../../core/service/authentication.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ForgetPasswordRequest } from '../../core/interfaces/forgetPasswordRequest';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ResetCodeRequest } from '../../core/interfaces/resetCodeRequest';
import { ResetPasswordRequest } from '../../core/interfaces/resetPasswordRequest';
import { Router } from '@angular/router';

@Component({
    selector: 'app-forget-password',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, ToastrModule],
    templateUrl: './forget-password.component.html',
    styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {

    step: number = 1;
    emailForm!: FormGroup;
    codeForm!: FormGroup;
    newPasswordForm!: FormGroup;
    @ViewChild('sendCodeBtn') sendCodeBtn!: ElementRef;
    @ViewChild('verifyResetCodeBtn') verifyResetCodeBtn!: ElementRef;
    @ViewChild('resetPasswordBtn') resetPasswordBtn!: ElementRef;

    constructor(
        private _authenticationService: AuthenticationService,
        private _formBuilder: FormBuilder,
        private _toastrService: ToastrService,
        private _renderer2:Renderer2,
        private _router: Router
    ) {
        this.emailForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });

        this.codeForm = this._formBuilder.group({
            resetCode: ['', Validators.required]
        });

        this.newPasswordForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            newPassword: ['', Validators.required]
        });
    }


    sendVerifyCode(): void {
        if (this.emailForm.valid) {
            this._renderer2.setAttribute(this.sendCodeBtn.nativeElement, 'disabled', 'true');
            const email = this.emailForm.value as ForgetPasswordRequest;
            this._authenticationService.forgetPassword(email).subscribe({
                next: (response) => {
                    console.log(response);
                    if (response.statusMsg === 'success') {
                        this.step = 2;
                        this._renderer2.removeAttribute(this.sendCodeBtn.nativeElement, 'disabled');
                        this._toastrService.success(response.message);
                    }
                },
                error: (e: HttpErrorResponse) => {
                    this._renderer2.removeAttribute(this.sendCodeBtn.nativeElement, 'disabled');
                }
            })
        }
    }


    verifyResetCode() {
        if (this.codeForm.valid) {
            const resetCodeRequest = this.codeForm.value as ResetCodeRequest;
            this._renderer2.setAttribute(this.verifyResetCodeBtn.nativeElement, 'disabled', 'true');
            this._authenticationService.resetCode(resetCodeRequest).subscribe({
                next: (response) => {
                    console.log(response);
                    if (response.status === 'Success') {
                        this.step = 3;
                        this._renderer2.removeAttribute(this.verifyResetCodeBtn.nativeElement, 'disabled');
                        this._toastrService.success('Verification Successfull');
                    }
                },
                error: (e: HttpErrorResponse) => {
                    this._toastrService.error(e.error.message);
                    this._renderer2.removeAttribute(this.verifyResetCodeBtn.nativeElement, 'disabled');
                }
            })
        }
    }



    resetPassword(): void {
        if (this.newPasswordForm.valid) {
            const resetPasswordRequest = this.newPasswordForm.value as ResetPasswordRequest;
            this._renderer2.setAttribute(this.resetPasswordBtn.nativeElement, 'disabled', 'true');
            this._authenticationService.resetPassword(resetPasswordRequest).subscribe({
                next: (response) => {
                    if (response.token) {
                        localStorage.setItem('token', response.token);
                        this._renderer2.removeAttribute(this.resetPasswordBtn.nativeElement, 'disabled');
                        this._toastrService.success('Great! Password Reset Successfull');
                        this._router.navigate(['/login']);
                    }
                },
                error: (e: HttpErrorResponse) => {
                    this._renderer2.removeAttribute(this.resetPasswordBtn.nativeElement, 'disabled');
                }
            })
        }
    }




}
