import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Game } from './game';


@Injectable({ providedIn: 'root' })
export class GameService {

  private gamesUrl = 'http://appserver.alunos.di.fc.ul.pt:3033/api/games';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
  ) { }

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.gamesUrl)
  }

  getGame(id: string): Observable<Game> {
    const url = `${this.gamesUrl}/${id}`;
    return this.http.get<Game>(url).pipe(
      catchError(this.handleError<Game>(`getGame id=${id}`))
    );
  }

  addGame(game: Game): Observable<Game> {
    return this.http.post<Game>(this.gamesUrl, game, this.httpOptions)
      .pipe(
        catchError(this.handleError<Game>('addGame'))
      );
  }

  deleteGame(id: number): Observable<Game> {
    const url = `${this.gamesUrl}/${id}`;

    return this.http.delete<Game>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError<Game>('deleteGame'))
      );
  }

  updateGame(game: Game): Observable<any> {
    return this.http.put(this.gamesUrl, game, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('updateHero'))
      );
  }

  searchGames(term: string): Observable<Game[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Game[]>(`${this.gamesUrl}/search?term=${term}`).pipe(
      catchError(this.handleError<Game[]>('searchGames', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }

}
