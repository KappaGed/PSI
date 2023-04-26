import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { User } from '../app/user';


const baseUrl = "http://localhost:8080/api/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject: BehaviorSubject<User | null>;
  private currentUser: Observable<User | null>;

  constructor(private http: HttpClient, private router: Router) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.userSubject.asObservable();
  }

  // register new user
  signup(username: string, password: string): Observable<boolean> {
    const body = { username, password };
    return this.http.post<boolean>(`${baseUrl}/signup`, body);
  }

  // login
  login(username: string, password: string): Observable<User> {
    const body = { username, password };
    return this.http.post<User>(`${baseUrl}/login`, body)
      .pipe(
        tap(user => {
          // store user details in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        })
      );
  }

  // get current user
  getCurrentUser(): User | null {
    return this.userSubject.value;
  }

  // logout
  logout(): void {
    // remove from local storage
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['login/']);
  }



  // to-do: delete

  // to-do: update
}
