import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Game } from './game';
import { Observable, map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartUrl = 'http://10.101.151.25:3083/api/users/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
  ) { }

  getCart(userId: string): Observable<Game[]> {
    const url = `${this.cartUrl}${userId}/cart`;
    return this.http.get<Game[]>(url);
  }

  addToCart(userId: string, game: Game): Observable<Game[]> {
    const url = `${this.cartUrl}${userId}/cart`;
    return this.http.post<Game[]>(url, { game_id: game._id }, this.httpOptions);
  }

  removeFromCart(userId: string, game: Game): Observable<any> {
    return this.http.delete(`${this.cartUrl}${userId}/cart/${game._id}`);
  }

  emptyCart(userId: string): Observable<any> {
    const url = `${this.cartUrl}${userId}/cart`;
    return this.http.delete(url);
  }

  updateCartItem(itemId: string, updatedItem: any) {
    return this.http.put(`${this.cartUrl}/${itemId}`, updatedItem);
  }

}
