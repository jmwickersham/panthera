import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../users/users';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  registerData = { 
    username: '', 
    password: '',
    first_name: '', 
    last_name: '' 
  };
  message = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

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
