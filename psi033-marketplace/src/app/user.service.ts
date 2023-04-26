import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

import { User } from '../app/user'


const baseUrl = "http://localhost:8080/api/users/";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // gets all users
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(baseUrl);
  }

  // gets users by id
  get(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  // create new user
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  // update user info
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  // delete user
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
