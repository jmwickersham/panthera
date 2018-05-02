import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
 
import { Task } from './tasks/tasks'
import { MessageService } from './message.service';
 
const httpOptions = {
  headers: new HttpHeaders(
    { 
      'Content-Type': 'application/json'
    }
  )
};

@Injectable()
export class TaskService {
  private taskUrl = 'http://localhost:3000/api/tasks';  // URL to web api
 
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }
 
  // GET Methods

  // GET tasks from the server 
  getTasks (): Observable<Task[]> {
    return this.http.get<Task[]>(this.taskUrl)
      .pipe(
        tap(tasks => this.log(`fetched tasks`)),
        catchError(this.handleError('getTasks', []))
      );
  }

  // Error Handling
  
  /* Handle Http operation that failed. Let the app continue.
  @param operation - name of the operation that failed
  @param result - optional value to return as the observable result */

  private handleError<T> (operation = 'operation', result?: T) {
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
