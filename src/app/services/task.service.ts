import { environment } from '../../environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Task } from '../tasks/tasks'
import { MessageService } from '../services/message.service';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json'
    }
  )
};

@Injectable()
export class TaskService {
  private taskUrl = environment.serverUrl + '/api/tasks';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  // GET Methods

  // GET tasks from the server 
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.taskUrl)
      .pipe(
        tap(tasks => this.log(`fetched tasks`)),
        catchError(this.handleError('getTasks', []))
      );
  }

  // GET task by id. Return `undefined` when id not found 
  getTaskNo404<Data>(id: string): Observable<Task> {
    const url = `${this.taskUrl}/?_id=${id}`;
    return this.http.get<Task[]>(url)
      .pipe(
        map(tasks => tasks[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} task id=${id}`);
        }),
        catchError(this.handleError<Task>(`getTask id=${id}`))
      );
  }

  // GET task by id. Will 404 if id not found 
  getTask(id: string): Observable<Task> {
    const url = `${this.taskUrl}/${id}`;
    return this.http.get<Task>(url).pipe(
      tap(_ => this.log(`fetched task id=${id}`)),
      catchError(this.handleError<Task>(`getTask id=${id}`))
    );
  }

  // POST Methods

  // POST: add a new task to the server 
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.taskUrl, task, httpOptions).pipe(
      tap((task: Task) => this.log(`added task w/ id=${task._id}`)),
      catchError(this.handleError<Task>('addTask'))
    );
  }

  // PUT Methods

  // PUT: update the task on the server 
  updateTask(task: Task): Observable<Task> {
    const url = `${this.taskUrl}/${task._id}`;
    return this.http.put<Task>(url, task, httpOptions).pipe(
      tap(_ => this.log(`updated task id=${task._id}`)),
      catchError(this.handleError<Task>(`updateTask task id=${task._id}`))
    );
  }

  // DELETE Methods

  // DELETE: delete the hero from the server
  deleteTask (task: Task | number): Observable<Task> {
    const id = typeof task === 'number' ? task : task._id;
    const url = `${this.taskUrl}/${id}`;

    return this.http.delete<Task>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted task`)),
      catchError(this.handleError<Task>('deleteTask'))
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
