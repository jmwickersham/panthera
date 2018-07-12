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
export class TwitchService {
  private twitchUrl = environment.serverUrl + '/api/twitch';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  // GET Methods
  getUser(id = '42859398') {
    return this.http.get<any[]>(this.twitchUrl + '/user', {
      params: new HttpParams().set('id', id.toString())
    }).pipe(
        map(twitchUser => twitchUser),
        tap(twitchUser => this.log(`fetched twitchUser: ${twitchUser}`)),
        catchError(this.handleError('getUser'))
      );
  }

  getStream(id = '42859398') {
    return this.http.get<any[]>(this.twitchUrl + '/streams', { 
        params: new HttpParams().set('id', id.toString())
    }).pipe(
        map(twitchStream => twitchStream),
        tap(twitchStream => this.log(`fetched twitchStream: ${twitchStream}`)),
        catchError(this.handleError('getStream', []))
      );
  }

  // Error Handling

  /* Handle Http operation that failed. Let the app continue.
  @param operation - name of the operation that failed
  @param result - optional value to return as the observable result */

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // Log a TwitchService message with the MessageService
  private log(message: string) {
    this.messageService.add('TwitchService: ' + message);
  }
}
