import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './core/services/auth-guard.service';

const routes: Routes = [
  { path: 'landing', loadChildren: 'app/landing/landing.module#LandingModule' },
  { path: 'tasks', loadChildren: 'app/tasks/task.module#TaskModule', canActivate: [AuthGuardService] },
  { path: 'users', loadChildren: 'app/users/user.module#UserModule' },
  { path: 'login', loadChildren: 'app/login/login.module#LoginModule' },
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: '**', redirectTo: '/landing' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
