import { Component, OnInit } from '@angular/core';
import { Location }          from '@angular/common';

import { AuthenticationService, UserDetails } from '../core/services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  details: UserDetails;

  constructor(
    private auth: AuthenticationService,
    private location: Location
  ) { }

  ngOnInit() {
    this.auth.profile().subscribe(user => {
      this.details = user;
    }, (err) => {
      console.error(err);
    });
  }

  goBack(): void {
    this.location.back();
  }
}
