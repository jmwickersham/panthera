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
export class BattlenetService {
  private bnetUrl = environment.serverUrl + '/api/battlenet';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  // GET Methods
  getWowCharacter() {
    return this.http.get<any[]>(this.bnetUrl + '/wow/character')
      .pipe(
        map(bnetWowCharacter => bnetWowCharacter),
        tap(bnetWowCharacter => this.log(`fetched bnetWowCharacter: ${bnetWowCharacter}`)),
        catchError(this.handleError('getWowCharacter', []))
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

  // Log a BattleNet Service message with the MessageService
  private log(message: string) {
    this.messageService.add('BattleNet Service: ' + message);
  }
}
