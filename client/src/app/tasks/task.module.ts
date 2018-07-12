import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { TaskRoutingModule } from './task-routing.module';

import { TaskListComponent } from './task-list/task-list.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';

@NgModule({
  imports: [
    SharedModule,
    TaskRoutingModule
  ],
  declarations: [
    TaskListComponent,
    TaskDetailComponent
  ],
  exports: [
    TaskListComponent,
    TaskDetailComponent,
    SharedModule
  ],
  providers: []
})
export class TaskModule { }
