import { environment } from '../environments/environment';

// Modules
import { NgModule }          from '@angular/core';
import { BrowserModule }     from '@angular/platform-browser';
import { FormsModule }       from '@angular/forms';
import { HttpClientModule }  from '@angular/common/http';
import { AppRoutingModule }  from './app-routing.module';

// Components
import { AppComponent }        from './app.component';
import { MessagesComponent }   from './messages/messages.component';
import { TasksComponent }      from './tasks/tasks.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { UsersComponent }      from './users/users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { LoginComponent }      from './login/login.component';
import { RegisterComponent }   from './register/register.component';
import { DashboardComponent }  from './dashboard/dashboard.component';
import { ProfileComponent }    from './profile/profile.component';

// Services
import { TaskService }           from './services/task.service';
import { MessageService }        from './services/message.service';
import { UserService }           from './services/user.service';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuardService }      from './services/auth-guard.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    TasksComponent,
    MessagesComponent,
    TaskDetailComponent,
    UsersComponent,
    UserDetailComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ProfileComponent
  ],
  providers: [
    TaskService,
    MessageService,
    UserService,
    AuthenticationService,
    AuthGuardService
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
