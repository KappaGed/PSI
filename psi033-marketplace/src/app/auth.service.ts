import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from './user.service';
import { tap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { User } from '../app/user';

const baseUrl = "http://10.101.151.25:3083/api/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject: BehaviorSubject<User | null>;
  private loggedInUser: Observable<User | null>;

  constructor(private http: HttpClient, private router: Router, private userService: UserService) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')!));
    this.loggedInUser = this.userSubject.asObservable();
  }

  // register new user
  signup(username: string, password: string): Observable<boolean> {
    const body = { username, password };
    return this.http.post<boolean>(`${baseUrl}/signup`, body);
  }

  // login
  login(username: string, password: string): Observable<User> {
    const body = { username, password };
    let userId: string;
    return this.http.post<{ message: string, userId: string }>(`${baseUrl}/login`, body)
      .pipe(
        tap(response => {
          userId = response.userId;
        }),
        switchMap(() => this.userService.getById(userId)),
        tap(user => {
          // store user details in local storage to keep user logged in between page refreshes
          localStorage.setItem('loggedInUser', JSON.stringify(userId));
          this.userSubject.next(user);
          return user;
        })
      );
  }

  // get currently logged using local storage
  getLoggedInUser(): Observable<User | null> {
    const userId = localStorage.getItem('loggedInUser');
    if (!userId) {
      return of(null);
    }
    return this.userService.getById(userId);
  }

  getLoggedInUserId(): string | null {
    return localStorage.getItem('loggedInUser');
  }

  // logout
  logout(): void {
    // remove from local storage
    localStorage.removeItem('loggedInUser');
    this.userSubject.next(null);
    this.router.navigate(['login/']);
  }

}
