import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../users/users';
import { UserService } from '../services/user.service';
import { AuthenticationService, TokenPayload } from '../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent /*implements OnInit*/ {
  // registerData = { 
  //   username: '', 
  //   password: '',
  //   first_name: '', 
  //   last_name: '' 
  // };
  // message = '';

  credentials: TokenPayload = {
    username: '',
    first_name: '',
    last_name: '',
    password: ''
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService,
    private auth: AuthenticationService
  ) { }

  ngOnInit() {
  }

  // register(user: User): void {
  //   if (!user) {
  //     return;
  //   }
  //   this.userService.registerUser(user)
  //     //.subscribe(user => this.user = user);
  //     .subscribe(resp => {
  //       console.log(resp);
  //       this.router.navigate(['login']);
  //     }, err => {
  //       this.message = err.error.msg;
  //     });
  // }

  register() {
    this.auth.register(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/profile');
    }, (err) => {
      console.error(err);
    });
  }

  goBack(): void {
    this.location.back();
  }
}
