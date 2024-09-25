import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterRequest } from '../interfaces/registerRequest';
import { LoginRequest } from '../interfaces/loginRequest';
import { AuthResponse } from '../interfaces/authResponse';
import { Router } from '@angular/router';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { ForgetPasswordRequest } from '../interfaces/forgetPasswordRequest';
import { ResetCodeRequest } from '../interfaces/resetCodeRequest';
import { ResetPasswordRequest } from '../interfaces/resetPasswordRequest';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    private _baseUrl: string = 'https://ecommerce.routemisr.com/api/v1/auth';

    constructor(
        private _client: HttpClient,
        private _router: Router) { }

    register(registerRequest: RegisterRequest): Observable<AuthResponse> {
        return this._client.post<AuthResponse>(
            `${this._baseUrl}/signup`,
            registerRequest,
            {
                headers: {
                    Accept: 'application/json',
                },
            }
        );
    }

    login(loginRequest: LoginRequest): Observable<AuthResponse> {
        return this._client.post<AuthResponse>(
            `${this._baseUrl}/signin`,
            loginRequest,
            {
                headers: {
                    Accept: 'application/json',
                },
            }
        );
    }

    saveUserToken(token: string): void {
        localStorage.setItem('token', token);
    }

    signOut(): void {
        localStorage.removeItem('token');
        this._router.navigate(['/login']);
    }

    getCurrentUserInfo(): JwtPayload | null {
        const token: any = localStorage.getItem('token');
        if (token != null) {
            const decodedToken: JwtPayload = jwtDecode(token);
            return decodedToken;
        }

        return null;
    }


    forgetPassword(forgetPasswordRequest: ForgetPasswordRequest): Observable<any> {
        return this._client.post(`${this._baseUrl}/forgotPasswords`, forgetPasswordRequest);
    }

    resetCode(resetCodeRequest: ResetCodeRequest): Observable<any> {
        return this._client.post(`${this._baseUrl}/verifyResetCode`, resetCodeRequest);
    }

    resetPassword(resetPasswordRequest: ResetPasswordRequest): Observable<any> {
        return this._client.put(`${this._baseUrl}/resetPassword`, resetPasswordRequest);
    }
}
