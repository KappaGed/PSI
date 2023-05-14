import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

import { User } from '../app/user'
import { Game } from './game';

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

  // gets users by usernme
  getByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${baseUrl}/username/${username}`);
  }

  // create new user
  createNewUser(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  // update user info
  update(id: any, data: any): Observable<any> {
    const userId = id.replace(/"/g, '');
    return this.http.put(`${baseUrl}/${userId}`, data);
  }

  // delete user
  deleteById(id: any): Observable<any> {
    const userId = id.replace(/"/g, '');
    return this.http.delete(`${baseUrl}/${userId}`);
  }

  // search for users
  searchUsers(query: string): Observable<User[]> {
    return this.http.get<User[]>(`${baseUrl}/search?q=${query}`);
  }

  getUserCart(): Observable<Game[]> {
    return this.http.get<Game[]>(`http://localhost:8080/api/cart`);
  }

  // addToCart(id: string, game: Game): Observable<any> {

  // }
}
