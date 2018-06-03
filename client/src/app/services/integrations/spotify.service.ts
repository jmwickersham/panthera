import { environment } from '../../../environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from '../../services/message.service';

const redirectUrl = environment.serverUrl;
const spotifyAuth = environment.spotify.authorization;
const headers = new HttpHeaders().set('Authorization', spotifyAuth);

@Injectable()
export class SpotifyService {
  private spotifyUrl = 'https://api.spotify.com';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  // GET my Spotify info from the server 
  getMyInfo() {
    return this.http.get<any[]>(this.spotifyUrl + '/v1/me', {
      headers: headers
    }).pipe(
      map(mySpotifyInfo => mySpotifyInfo),
      tap(mySpotifyInfo => this.log(`fetched mySpotifyInfo`)),
      catchError(this.handleError('getMyInfo', []))
    );
  }

    // GET my Spotify info from the server 
    getMyCurrentlyPlaying() {
      return this.http.get<any[]>(this.spotifyUrl + '/v1/me/player/currently-playing', {
        headers: headers
      }).pipe(
        map(mySpotifyCurrentlyPlaying => mySpotifyCurrentlyPlaying),
        tap(mySpotifyCurrentlyPlaying => this.log(`fetched mySpotifyInfo`)),
        catchError(this.handleError('getMyCurrentlyPlaying', []))
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
