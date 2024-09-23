import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
    const token = localStorage.getItem('token');
    if (token == null)
        return next(req);

    const modifiedRequest = req.clone({
        headers: req.headers.set('token', token)
    })

    return next(modifiedRequest);
};
