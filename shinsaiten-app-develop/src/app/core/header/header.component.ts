import { Component, OnInit, Output, EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '../guards';
import { AuthenticationService } from '../services';
import { getDiffieHellman } from 'crypto';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  loggedInUserDisplayName: string;
  constructor(private router: Router, private authGuard: AuthGuard, authenticationService: AuthenticationService) {
    authenticationService.getLoggedInName.subscribe(value => {
      this.loggedInUserDisplayName = value;
    });
  }

  ngOnInit() {
    this.loggedInUserDisplayName = this.authGuard.getUserName()
  }

  getMenuList() {
    this.router.navigate(['home/user-home'])
  }

  logout(){
    localStorage.clear();
    this.loggedInUserDisplayName = "";
    this.router.navigate(['/login/login-user'])
  }

  goToHome(){
    // Navigate to the home page
    this.router.navigate(['/']);
  }
}
