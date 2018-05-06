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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerData = { username: '', password: '' };
  message = '';

  constructor(
    // private http: HttpClient, 
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  // register() {
  //   this.http.post('/api/register', this.registerData)
  //     .subscribe(resp => {
  //       console.log(resp);
  //       this.router.navigate(['login']);
  //     }, err => {
  //       this.message = err.error.msg;
  //     });
  // }

  register(user: User): void {
    if (!user) {
      return;
    }
    this.userService.registerUser(user)
      //.subscribe(user => this.user = user);
      .subscribe(resp => {
        console.log(resp);
        this.router.navigate(['login']);
      }, err => {
        this.message = err.error.msg;
      });
  }

  goBack(): void {
    this.location.back();
  }
}
