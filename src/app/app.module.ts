import { environment } from '../environments/environment';

import { NgModule }          from '@angular/core';
import { BrowserModule }     from '@angular/platform-browser';
import { FormsModule }       from '@angular/forms';
import { HttpClientModule }  from '@angular/common/http';

import { MatPaginatorModule, MatSortModule, MatTableModule } from "@angular/material";

import { AppComponent }      from './app.component';
import { MessagesComponent } from './messages/messages.component';
import { TasksComponent }    from './tasks/tasks.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { TaskService }       from './services/task.service';
import { MessageService }    from './services/message.service';

import { AppRoutingModule }  from './app-routing.module';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  declarations: [
    AppComponent,
    TasksComponent,
    MessagesComponent,
    TaskDetailComponent,
    UsersComponent,
    UserDetailComponent,
    LoginComponent,
    RegisterComponent
  ],
  providers: [
    TaskService,
    MessageService
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
