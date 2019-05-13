import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    private router: Router;
    constructor(private injector: Injector) {
       // setTimeout(() => this.router = injector.get(Router));
    }
    handleError(error: Error | HttpErrorResponse) {
      const router = this.injector.get(Router);
     // const notificationService = this.injector.get(NotificationService);
    if (error instanceof HttpErrorResponse) {
      console.error('HttpErrorResponse: ', error);
      if (!navigator.onLine) {
        // Handle offline error
        // return notificationService.notify('No Internet Connection');
      } else {
        // Handle Http Error (error.status === 403, 404...)
       // return notificationService.notify(`${error.status} - ${error.message}`);
      }
    } else {
      console.error('Error: ', error);
    }
     console.error('It happens: ', error);
     this.router.navigate(['/error']);
    }
}

