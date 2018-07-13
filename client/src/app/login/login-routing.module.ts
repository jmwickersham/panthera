import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
// import { AuthGuardService } from '../core/services/auth-guard.service';
// import { UserDetailComponent } from '../users/user-detail/user-detail.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent }
  // { path: 'profile', component: UserDetailComponent, canActivate: [AuthGuardService] }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class LoginRoutingModule { }
