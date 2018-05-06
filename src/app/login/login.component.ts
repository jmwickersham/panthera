// import { Component, OnInit } from '@angular/core';
// import { HttpClient }        from '@angular/common/http';
import { Router } from '@angular/router';
// import { Observable }        from 'rxjs/Observable';
// import { tap, catchError }   from 'rxjs/operators';
// import { of }                from 'rxjs/observable/of';

import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../users/users';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData = { username: '', password: '' };
  message = '';
  data: any;

  constructor(
    // private http: HttpClient, 
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  // login() {
  //   this.http.post('/api/login', this.loginData)
  //     .subscribe(resp => {
  //       this.data = resp;
  //       localStorage.setItem('jwtToken', this.data.token);
  //     }, err => {
  //       this.message = err.error.msg;
  //     }
  //   );
  // }

  login(user: User): void {
    if (!user) {
      return;
    }
    this.userService.loginUser(user)
      //.subscribe(user => this.user = user);
      .subscribe(resp => {
        this.data = resp;
        localStorage.setItem('jwtToken', this.data.token);
      }, err => {
        this.message = err.error.msg;
      });
  }

  goBack(): void {
    this.location.back();
  }
}
