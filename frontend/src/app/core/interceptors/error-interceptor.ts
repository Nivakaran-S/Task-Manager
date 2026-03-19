import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Auth } from '../services/auth';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(Auth);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authService.logout();
      }
      
      const errorMessage = error.error?.message || error.statusText || 'An unexpected error occurred';
      console.error('HTTP Error:', errorMessage);
      
      return throwError(() => new Error(errorMessage));
    })
  );
};