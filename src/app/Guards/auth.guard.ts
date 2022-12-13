import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { };
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {


    if (!this.authService.isUserLoggedIn()) {

      this.router.navigate(["login"]);
      return false;
    }
    return true;
    

  }



}

