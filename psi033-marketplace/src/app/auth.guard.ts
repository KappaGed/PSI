import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      // user is logged in, allow access to dashboard
      this.router.navigate(['dashboard']);
      return true;
    }
    // user is not logged in, redirect to the login page
    this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
