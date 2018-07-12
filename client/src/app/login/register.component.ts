import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { AuthenticationService, TokenPayload } from '../core/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  credentials: TokenPayload = {
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    imageURL: '',
    password: ''
  };

  constructor(
    private router: Router,
    private location: Location,
    private auth: AuthenticationService
  ) { }

  ngOnInit() {
  }

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
