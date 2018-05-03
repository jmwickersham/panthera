import { NgModule }          from '@angular/core';
import { BrowserModule }     from '@angular/platform-browser';
import { FormsModule }       from '@angular/forms';
import { HttpClientModule }  from '@angular/common/http';

import { MatPaginatorModule, MatSortModule, MatTableModule } from "@angular/material";

import { AppComponent }      from './app.component';
import { TasksComponent }    from './tasks/tasks.component';
import { MessagesComponent } from './messages/messages.component';

import { TaskService }       from './tasks/shared/task.service';
import { MessageService }    from './messages/shared/message.service';

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
    MessagesComponent
  ],
  providers: [
    TaskService,
    MessageService
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
