import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { User } from '../../models/user.model';
import { UserService } from '../user.service';

import { AuthenticationService, TokenPayload } from '../../core/services/authentication.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user$: Observable<User>;

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
      this.user$ = this.getUser();
    }    
  }

  // getUser(): void {
  //   const id = this.route.snapshot.paramMap.get('id');
  //   this.userService.getUser(id)
  //   .subscribe(user => this.user = user);
  // }
  
  getUser() {
    return this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const id = params.get('id');
        return this.userService.getUser(id);
      })
    );
  }

  updateUser(user: User): void {
    this.userService.updateUser(this.user)
      .subscribe();
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(this.user)
      .subscribe(() => this.goBack());
  }

  register(credentials: TokenPayload) {
    this.auth.register(credentials).subscribe(() => {
      this.router.navigateByUrl('/landing');
    }, (err) => {
      console.error(err);
    });
  }

  goBack(): void {
    this.location.back();
  }
}
