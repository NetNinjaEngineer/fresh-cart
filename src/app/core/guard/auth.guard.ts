import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
    var router = inject(Router);
    return localStorage.getItem('token') != null ? true : router.navigate(['/login']);
};
