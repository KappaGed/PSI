import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MOCK_USERS, updateMockUsers } from '../mock-data/users.mock';
import { User } from '../app/user'


@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[] = MOCK_USERS;

  constructor() { }

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

        console.log("adding new user");
        this.users.push(newUser);
        updateMockUsers(this.users);

        observer.next(true);
        observer.complete();
      }
    });
  }

}
