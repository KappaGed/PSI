import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../app/user'

import { MOCK_USERS, updateMockUsers } from '../mock-data/users.mock';

const baseUrl = "http://localhost:8080/api/users/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users: User[] = MOCK_USERS;
  private currentUser: User | undefined;

  constructor() { }

  // to-do: move into a separate service called AuthService after
  createUser(username: string, password: string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      const userExists = this.users.some((user) => user.username === username);

      if (userExists) {
        console.log("user already exists");
        observer.next(false);
        observer.complete();
      } else {

        const newUser = {
          id: this.users.length + 1,
          username,
          password
        };

        // mock data for now
        // to-do: implement API
        console.log("adding new user");
        this.users.push(newUser);
        updateMockUsers(this.users);

        observer.next(true);
        observer.complete();
      }
    });
  }

  // to-do: move into a separate service called AuthService after
  login(username: string, password: string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      const user = this.users.find((user) => user.username === username && user.password === password);

      if (user) {
        this.currentUser = user;
        console.log("login successful");
        observer.next(true);
        observer.complete();
      } else {
        console.log("login failed");
        observer.next(false);
        observer.complete();
      }
    });
  }

  logout(): void {
    this.currentUser = undefined;
  }

  getCurrentUser(): User | undefined {
    return this.currentUser;
  }

}
