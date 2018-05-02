import { NgModule }          from '@angular/core';
import { BrowserModule }     from '@angular/platform-browser';
import { FormsModule }       from '@angular/forms';
import { HttpClientModule }  from '@angular/common/http';

import { AppComponent }      from './app.component';
import { TasksComponent }    from './tasks/tasks.component';
import { TaskService }       from './task.service';
import { MessageService }    from './message.service';
import { MessagesComponent } from './messages/messages.component';

import { AppRoutingModule }  from './app-routing.module';

import { MatPaginatorModule, MatSortModule, MatTableModule } from "@angular/material";

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