import { environment } from '../../../environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from '../../services/message.service';

const redirectUrl = environment.serverUrl;
const spotifyClientID = environment.spotify.clientID;
// const headers = new HttpHeaders().set('Client-ID', spotifyClientID);

@Injectable()
export class SpotifyService {
  private spotifyUrl = 'https://accounts.spotify.com';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  // GET Methods
  authorize() {
    return this.http.get<any[]>(this.spotifyUrl + '/authorize', {
      params: new HttpParams()
        .set('client_id', spotifyClientID)
        .set('response_type', 'code')
        .set('scope', 'user-read-currently-playing user-read-playback-state user-read-recently-played user-top-read')
        .set('redirect_uri', redirectUrl)
    }).pipe(
      map(spotifyAuth => spotifyAuth),
      tap(spotifyAuth => this.log(`fetched spotifyAuth`)),
      catchError(this.handleError('spotifyAuth', []))
    );
  }

  // GET tasks from the server 
  getUser(id = '76561198031523398') {
    return this.http.get<any[]>(this.spotifyUrl + '/ISteamUser/GetPlayerSummaries/v2', {
      params: new HttpParams()
        .set('steamids', id.toString())
    }).pipe(
      map(steamUser => steamUser["response"]),
      tap(steamUser => this.log(`fetched steamUser`)),
      catchError(this.handleError('getUser', []))
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

  // Log a SpotifyService message with the MessageService
  private log(message: string) {
    this.messageService.add('SpotifyService: ' + message);
  }
}
