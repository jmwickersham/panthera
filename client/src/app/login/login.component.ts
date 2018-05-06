import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../users/users';
import { UserService } from '../services/user.service';

import { AuthenticationService, TokenPayload } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  // loginData = { username: '', password: '' };
  // message = '';
  // data: any;

  credentials: TokenPayload = {
    username: '',
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

  // login(user: User): void {
  //   if (!user) {
  //     return;
  //   }
  //   this.userService.loginUser(user)
  //     .subscribe(resp => {
  //       this.data = resp;
  //       localStorage.setItem('jwtToken', this.data.token);
  //     }, err => {
  //       this.message = err.error.msg;
  //     });
  // }

  login() {
    this.auth.login(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/profile');
    }, (err) => {
      console.error(err);
    }); 
  }

  goBack(): void {
    this.location.back();
  }
}
