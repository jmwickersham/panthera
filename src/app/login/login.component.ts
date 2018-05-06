import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  login(user: User): void {
    if (!user) {
      return;
    }
    this.userService.loginUser(user)
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
