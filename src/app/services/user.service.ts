import { environment } from '../../environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from '../users/users'
import { MessageService } from '../services/message.service';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json'
    }
  )
};

@Injectable()
export class UserService {
  private userUrl = environment.serverUrl + '/api/users';
  private indexUrl = environment.serverUrl + '/api';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }
  
  // GET Methods

  // GET users from the server 
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl)
      .pipe(
        tap(users => this.log(`fetched users`)),
        catchError(this.handleError('getUsers', []))
      );
  }

  // GET user by id. Return `undefined` when id not found 
  getUserNo404<Data>(id: string): Observable<User> {
    const url = `${this.userUrl}/?_id=${id}`;
    return this.http.get<User[]>(url)
      .pipe(
        map(users => users[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} user id=${id}`);
        }),
        catchError(this.handleError<User>(`getUser id=${id}`))
      );
  }

  // GET user by id. Will 404 if id not found 
  getUser(id: string): Observable<User> {
    const url = `${this.userUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      tap(_ => this.log(`fetched user id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  // POST Methods

  // POST: register a new user
  registerUser(user: User): Observable<User> {
    const url = `${this.indexUrl}/register`;
    return this.http.post<User>(url, user, httpOptions).pipe(
      tap((user: User) => this.log(`registered user w/ id=${user._id}`)),
      catchError(this.handleError<User>('registerUser'))
    );
  }

//   this.http.post('/api/register', this.registerData)
//   .subscribe(resp => {
//     console.log(resp);
//     this.router.navigate(['login']);
//   }, err => {
//     this.message = err.error.msg;
//   });
// }

// POST: login user
loginUser(user: User): Observable<User> {
  const url = `${this.indexUrl}/login`;
  return this.http.post<User>(url, user, httpOptions).pipe(
    tap((user: User) => this.log(`logged user in w/ id=${user._id}`)),
    catchError(this.handleError<User>('loginUser'))
  );
}
// this.http.post('/api/login', this.loginData)
//       .subscribe(resp => {
//         this.data = resp;
//         localStorage.setItem('jwtToken', this.data.token);
//       }, err => {
//         this.message = err.error.msg;
//       }
//     );
//   }

  // PUT Methods

  // PUT: update the user on the server 
  updateUser(user: User): Observable<User> {
    const url = `${this.userUrl}/${user._id}`;
    return this.http.put<User>(url, user, httpOptions).pipe(
      tap(_ => this.log(`updated user id=${user._id}`)),
      catchError(this.handleError<User>(`updateUser user id=${user._id}`))
    );
  }

  // DELETE Methods

  // DELETE: delete the user from the server
  deleteUser (user: User | number): Observable<User> {
    const id = typeof user === 'number' ? user : user._id;
    const url = `${this.userUrl}/${id}`;

    return this.http.delete<User>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted user`)),
      catchError(this.handleError<User>('deleteUser'))
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
