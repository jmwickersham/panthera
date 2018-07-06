import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersComponent }from './users.component';
import { UsersDetailComponent } from './users-detail.component';

import { UsersService } from './users.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    UsersComponent,
    UsersDetailComponent
  ],
  providers: [
    UsersService
  ]
})
export class UsersModule { }
