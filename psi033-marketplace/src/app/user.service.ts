import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MOCK_USERS } from '../mock-data/users.mock';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  createUser(username: string, password: string): Observable<boolean> {

    // for now, using mock data to make sure it works
    // connect to DB later

    return of(true);
  }
}
