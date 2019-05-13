import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

export const TOKEN_NAME: string = 'token';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }
	
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		console.log("checking whether user is logged in");
		console.log(this.getToken());

		console.log("is token expired? : " + this.isTokenExpired());
        if (this.isTokenExpired() === false) {
            // logged in so return true
			console.log(this.router);
            return true;
        }
		
        // not logged in so redirect to login page with the return url
        //this.router.navigate(['login/login-user'], { queryParams: { returnUrl: state.url }});
		localStorage.clear();
		this.router.navigate(['login/login-user']);
        return false;
    }


	getToken(): string {
		return localStorage.getItem(TOKEN_NAME);
	}

	setToken(token: string): void {
		localStorage.setItem(TOKEN_NAME, token);
	}

	getTokenExpirationDate(token: string): Date {
		const decoded = jwt_decode(token);

		if (decoded.exp === undefined) return null;

		const date = new Date(0); 
		date.setUTCSeconds(decoded.exp);
		return date;
	}

	isTokenExpired(token?: string): boolean {
		if(!token) token = this.getToken();
		if(!token) return true;

		const date = this.getTokenExpirationDate(token);
		if(date === undefined) return false;
		return !(date.valueOf() > new Date().valueOf());
	}
	
	logout(): void{
		console.info("log out...........");
	}
	
	getUserId(): string {
		return localStorage.getItem('userId');
	}
	
	getUserName(): string {
		return localStorage.getItem('userName');
	}
}