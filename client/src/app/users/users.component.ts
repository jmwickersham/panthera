import { Component, OnInit } from '@angular/core';

import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];
  totalPages: number;
  currentPage: number;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => {
        this.currentPage = users["metadata"].currentPage;
        this.totalPages = users["metadata"].totalPages;
        this.users = users["data"]
      });
  }

  getUserPage(page): void {
    if (page * 1 < 1) {
      page = 1;
    }
    else if (page > this.totalPages) {
      page = this.totalPages;
    }
    this.currentPage = page;
    this.userService.getUsers(page)
    .subscribe(users => {
      this.users = users["data"]
    });
  }
}
