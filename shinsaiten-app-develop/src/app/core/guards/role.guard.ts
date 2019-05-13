import { Injectable } from '@angular/core';
import { 
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthGuard } from './auth.guard';
import decode from 'jwt-decode';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(public auth: AuthGuard, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
	  
	  console.log("checking expected role for route: ");
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem('token');
    // decode the token to get its payload
    const tokenPayload = decode(token);
    //if (
    //  !this.auth.isAuthenticated() || 
    //  tokenPayload.role !== expectedRole
    //) {
    //  this.router.navigate(['login']);
    //  return false;
    //}
    return true;
  }
}