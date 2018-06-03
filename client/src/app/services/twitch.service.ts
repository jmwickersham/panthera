import { environment } from '../../environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from '../services/message.service';

const clientID = environment.twitch.clientID;
const headers = new HttpHeaders().set('Client-ID', clientID);

@Injectable()
export class TwitchService {
  private twitchUrl = 'https://api.twitch.tv/helix';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  // GET Methods

  // GET tasks from the server 
  getUser(id = '42859398') {
    return this.http.get<any[]>(this.twitchUrl + '/users', {
      headers: headers, 
      params: new HttpParams().set('id', id.toString())
    }).pipe(
        map(twitchUser => twitchUser["data"]),
        tap(twitchUser => this.log(`fetched twitchUser`)),
        catchError(this.handleError('getUser', []))
      );
  }

  getStream(id = '42859398') {
    return this.http.get<any[]>(this.twitchUrl + '/streams', { 
      headers: headers, 
      params: new HttpParams().set('user_id', id.toString())
    }).pipe(
        map(twitchStream => twitchStream["data"]),
        tap(twitchStream => this.log(`fetched twitchStream`)),
        catchError(this.handleError('getStream', []))
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

  // Log a TaskService message with the MessageService
  private log(message: string) {
    this.messageService.add('TaskService: ' + message);
  }
}
