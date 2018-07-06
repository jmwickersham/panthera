import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../models/user.model';
import { UsersService } from './users.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.css']
})
export class UsersDetailComponent implements OnInit {
  @Input() user: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UsersService,
    private location: Location
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

  goBack(): void {
    this.location.back();
  }
}
