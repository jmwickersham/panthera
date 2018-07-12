import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { UserRoutingModule } from './user-routing.module';

import { UserListComponent }from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

@NgModule({
  imports: [
    SharedModule,
    UserRoutingModule
  ],
  declarations: [
    UserListComponent,
    UserDetailComponent
  ],
  exports: [
    UserListComponent,
    UserDetailComponent,
    SharedModule
  ],
  providers: []
})
export class UserModule { }
