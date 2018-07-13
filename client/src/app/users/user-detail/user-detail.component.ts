import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../../models/user.model';
import { UserService } from '../user.service';

import { AuthenticationService, TokenPayload } from '../../core/services/authentication.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  @Input() user: User;
  credentials: TokenPayload = {
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    imageURL: '',
    password: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private location: Location,
    private auth: AuthenticationService
  ) { }

  ngOnInit() {
    if(this.route.snapshot.paramMap.get('id') != 'new') {
      this.getUser();
    }    
  }

  getUser(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id)
    .subscribe(user => this.user = user);
  }

  updateUser(user: User): void {
    this.userService.updateUser(this.user)
      .subscribe();
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(this.user)
      .subscribe(() => this.goBack());
  }

  register() {
    this.auth.register(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/landing');
    }, (err) => {
      console.error(err);
    });
  }

  goBack(): void {
    this.location.back();
  }
}
