import { environment } from '../../environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Task } from '../models/task.model';
import { Comment } from '../models/comment.model';
import { MessageService } from '../core/services/message.service';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json'
    }
  )
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private taskUrl = environment.serverUrl + '/api/tasks';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  // GET Methods

  // GET tasks from the server 
  getTasks(pageNumber = 1, pageSize = 5): Observable<Task[]> {
    return this.http.get<Task[]>(this.taskUrl, { params: new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
    }).pipe(
        map(tasks => tasks),
        tap(tasks => this.log(`fetched tasks: ${tasks}`)),
        catchError(this.handleError('getTasks', []))
      );
  }

  // GET task by id. Return `undefined` when id not found 
  getTaskNo404<Data>(id: string): Observable<Task> {
    return this.http.get<Task[]>(`${this.taskUrl}/?_id=${id}`)
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
    return this.http.get<Task>(`${this.taskUrl}/${id}`).pipe(
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

  // POST: add a new comment to the server 
  addComment(taskID: string, comment: string): Observable<Comment> {
    let body = {"comment": {"text": comment}};
    return this.http.post<Comment>(`${this.taskUrl}/${taskID}/comments`, body, httpOptions).pipe(
      tap((comment: Comment) => this.log(`added comment w/ id=${comment._id}`)),
      catchError(this.handleError<Comment>(`addComment for task: ${taskID}`))
    );
  }

  // PUT Methods

  // PUT: update the task on the server 
  updateTask(task: Task): Observable<Task> {
     return this.http.put<Task>(`${this.taskUrl}/${task._id}`, task, httpOptions).pipe(
      tap(_ => this.log(`updated task id=${task._id}`)),
      catchError(this.handleError<Task>(`updateTask task id=${task._id}`))
    );
  }

  // DELETE Methods

  // DELETE: delete the task from the server
  deleteTask (task: Task | number): Observable<Task> {
    const id = typeof task === 'number' ? task : task._id;

    return this.http.delete<Task>(`${this.taskUrl}/${id}`, httpOptions).pipe(
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
