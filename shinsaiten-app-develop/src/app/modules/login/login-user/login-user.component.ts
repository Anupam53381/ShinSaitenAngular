import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { AuthGuard } from 'src/app/core/guards';
import { AuthenticationService } from 'src/app/core/services';


@Component({
    selector: 'app-user',
    templateUrl: './login-user.component.html'
})
export class LoginUserComponent implements OnInit {
    @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
    user: User = new User();
    errorMessage: String = '';
    constructor(private router: Router, private userService: UserService, private authGuard: AuthGuard, private AuthenticationService: AuthenticationService) {
    }

    ngOnInit() {
        this.clearLocalStorage();
        //alert( "Init method called" );
    }

    loginUser(): void {
        this.userService.loginUser(this.user)
            .subscribe(data => {
                if (Object.keys(data['roles']).length > 0) {
                    console.log(data['roles'][0].name);
                    localStorage.setItem('userRole', data['roles'][0].name)
                } else {
                    localStorage.setItem('userRole', 'None');
                }
                localStorage.setItem('token', data['accessToken']);
                localStorage.setItem('SecurityToken', data['tokenType'] + ' ' + data['accessToken']);
                localStorage.setItem('userId', data['userId']);
                localStorage.setItem('userName', data['firstName'] + ' ' + data['lastName'])
                this.AuthenticationService.getLoggedInName.emit(this.authGuard.getUserName());

                // If user logged in then 
                this.router.navigate(['home/user-home']);
            },
            err => {
                console.log('Error in Login');
                this.errorMessage = 'Login ID or Password is Incorrect.';
            });
    }

    clearLocalStorage(): void {
        console.log("removing local storage..............");
        localStorage.clear();
    }
}
