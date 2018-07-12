import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'landing', loadChildren: 'app/landing/landing.module#LandingModule' },
  { path: 'tasks', loadChildren: 'app/tasks/task.module#TaskModule' },
  { path: 'users', loadChildren: 'app/users/user.module#UserModule' },
  { path: 'login', loadChildren: 'app/login/login.module#LoginModule' },
  { path: '', redirectTo: '/landing', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
