import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';

import { TaskListComponent } from './task-list/task-list.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';

@NgModule({
  imports: [
    CommonModule,
    TaskRoutingModule
  ],
  declarations: [
    TaskListComponent,
    TaskDetailComponent
  ],
  exports: [
    TaskListComponent,
    TaskDetailComponent
  ],
  providers: []
})
export class TaskModule { }
