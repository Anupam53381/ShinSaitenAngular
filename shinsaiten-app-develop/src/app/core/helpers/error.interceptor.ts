import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services';

/*
 * Error interceptor to handle all http errors in a single location 
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router, private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                this.router.navigate(['/app-error']);
            }
			if (err.status === 500){
				console.log("Internal server error occurred");
				this.router.navigate(['/app-error']);
			}
			
			if (err.status === 404){
				console.log("Internal server error occurred");
				this.router.navigate(['/app-error']);
			}
			
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}