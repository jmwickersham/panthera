import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'landing', loadChildren: 'app/landing/landing.module#LandingModule' },
  { path: 'tasks', loadChildren: 'app/tasks/tasks.module#TasksModule' },
  { path: 'users', loadChildren: 'app/users/users.module#UsersModule' },
  { path: '', redirectTo: '/landing', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
