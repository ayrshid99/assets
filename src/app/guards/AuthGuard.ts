import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
 import { AppState} from "../domain/AppState"
 import {Store } from '@ngrx/store'
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router,private store:Store<AppState>) { }
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
     return true;
     
     /*   if (localStorage.getItem('token')) {
            // logged in so return true
            return true;
        }



 
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login', { returnUrl: state.url , aux:"login" }]);
        return false;*/
    }
}