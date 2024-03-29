import { Injectable } from '@angular/core';
import { Game } from './game';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private wishlistUrl = 'http://10.101.151.25:3083/api/users/';

  constructor(
    private http: HttpClient,
  ) { }

  getWishlist(userId: string): Observable<Game[]> {
    const url = `${this.wishlistUrl}${userId}/wishlist`;
    return this.http.get<Game[]>(url);
  }

  addToWishist(userId: string, game: Game): Observable<Game[]> {
    const url = `${this.wishlistUrl}${userId}/wishlist`;
    return this.http.post<Game[]>(url, { game_id: game._id }, this.httpOptions);
  }

  isOnWishlist(userId: string, game: Game): Observable<{ isOnWishlist: boolean }> {
    return this.http.get<{ isOnWishlist: boolean }>(`${this.wishlistUrl}${userId}/wishlist/${game._id}`);
  }



  removeFromWishlist(userId: string, game: Game): Observable<any> {
    return this.http.delete(`${this.wishlistUrl}${userId}/wishlist/${game._id}`);
  }
}
