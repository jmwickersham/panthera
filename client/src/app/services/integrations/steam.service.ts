import { environment } from '../../../environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from '../../services/message.service';

const steamKey = environment.steam.key;

@Injectable()
export class SteamService {
  private steamUrl = 'https://api.steampowered.com';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  // GET Methods

  // GET tasks from the server 
  getUser(id = '76561198031523398') {
    return this.http.get<any[]>(this.steamUrl + '/ISteamUser/GetPlayerSummaries/v2', {
      params: new HttpParams()
      .set('key', steamKey.toString())
      .set('steamids', id.toString())
    }).pipe(
        map(steamUser => steamUser["response"]),
        tap(steamUser => this.log(`fetched steamUser`)),
        catchError(this.handleError('getUser', []))
      );
  }

  getOwnedGames(id = '76561198031523398') {
    return this.http.get<any[]>(this.steamUrl + '/IPlayerService/GetOwnedGames/v1', { 
      params: new HttpParams()
      .set('key', steamKey.toString())
      .set('steamid', id.toString())
      .set('include_appinfo', '1')
      .set('include_played_free_games', '1')
    }).pipe(
        map(steamGames => steamGames["response"]),
        tap(steamGames => this.log(`fetched steamGames`)),
        catchError(this.handleError('getOwnedGames', []))
      );
  }

  getRecentGames(id = '76561198031523398') {
    return this.http.get<any[]>(this.steamUrl + '/IPlayerService/GetRecentlyPlayedGames/v1', { 
      params: new HttpParams()
      .set('key', steamKey.toString())
      .set('steamid', id.toString())
    }).pipe(
        map(steamRecentGames => steamRecentGames["response"]),
        tap(steamRecentGames => this.log(`fetched steamRecentGames`)),
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
