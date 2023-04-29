import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

import { User } from '../app/user'

const baseUrl = "http://localhost:8080/api/users";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // gets all users
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(baseUrl);
  }

  // gets users by id
  getById(id: any): Observable<any> {
    const userId = id.replace(/"/g, ''); // remove quotation marks from id string
    return this.http.get(`${baseUrl}/${userId}`);
  }

  // create new user
  createNewUser(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  // update user info
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  // delete user
  deleteById(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
