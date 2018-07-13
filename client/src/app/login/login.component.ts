import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { AuthenticationService, TokenPayload } from '../core/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  credentials: TokenPayload = {
    username: '',
    password: ''
  };

  constructor(
    private router: Router,
    private location: Location,
    private auth: AuthenticationService
  ) { }

  ngOnInit() {
  }

  login() {
    this.auth.login(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/landing');
    }, (err) => {
      console.error(err);
    }); 
  }

  goBack(): void {
    this.location.back();
  }
}
