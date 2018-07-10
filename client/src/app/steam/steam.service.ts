import { environment } from '../../environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from '../core/services/message.service';

@Injectable({
  providedIn: 'root'
})
export class SteamService {
  private steamUrl = environment.serverUrl + '/api/steam';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  // GET Methods
  getUser(id = '76561198031523398') {
    return this.http.get<any[]>(this.steamUrl + '/user', {
       params: new HttpParams()
        .set('id', id.toString())
    }).pipe(
         map(steamUser => steamUser),
         tap(steamUser => this.log(`fetched steamUser: ${steamUser}`)),
         catchError(this.handleError('getUser', []))
    );
  }

  getOwnedGames(id = '76561198031523398') {
    return this.http.get<any[]>(this.steamUrl + '/ownedGames', { 
      params: new HttpParams()
      .set('id', id.toString())
    }).pipe(
        map(steamGames => steamGames),
        tap(steamGames => this.log(`fetched steamGames: ${steamGames}`)),
        catchError(this.handleError('getOwnedGames', []))
      );
  }

  getRecentGames(id = '76561198031523398') {
    return this.http.get<any[]>(this.steamUrl + '/recentGames', { 
      params: new HttpParams()
      .set('id', id.toString())
    }).pipe(
        map(steamRecentGames => steamRecentGames),
        tap(steamRecentGames => this.log(`fetched steamRecentGames: ${steamRecentGames}`)),
        catchError(this.handleError('getRecentGames', []))
      );
  }

  // Error Handling

  /* Handle Http operation that failed. Let the app continue.
  @param operation - name of the operation that failed
  @param result - optional value to return as the observable result */

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // Log a SteamService message with the MessageService
  private log(message: string) {
    this.messageService.add('SteamService: ' + message);
  }
}
