import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthGuard } from '../guards';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthenticationService {
    @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
    constructor(private http: HttpClient,private authGuard : AuthGuard) { }

    login(username: string, password: string) {
		console.log("user login..............................");
        return this.http.post<any>(environment.baseUrl+`/auth/user/signin`, { username: username, password: password })
            .pipe(map(user => {
				console.log(user);
				console.log(user.token);
				console.log(user.roles);
				
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                this.getLoggedInName.emit(this.authGuard.getUserName);

                return user;
            }));
    }

    logout() {
		console.log("logout........");
        // remove user from local storage to log user out
        localStorage.removeItem('UserRole');
		localStorage.removeItem('token');
    }
}