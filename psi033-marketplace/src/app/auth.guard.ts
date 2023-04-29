import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = this.authService.getLoggedInUser();
    if (!isLoggedIn) {
      this.router.navigate(['login']);
      return false;
    }

    // don't allow authed user to access login/ or  register/
    const currentUrl = this.router.url;
    const isLoginPage = currentUrl.endsWith('login');
    const isRegisterPage = currentUrl.endsWith('register');
    if (isLoggedIn && (isLoginPage || isRegisterPage)) {
      this.router.navigate(['dashboard']);
      return false;
    }
    return true;
  }
}
