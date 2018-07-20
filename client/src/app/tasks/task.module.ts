import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { TaskRoutingModule } from './task-routing.module';

import { TaskListComponent } from './task-list/task-list.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { CommentDialogComponent } from './task-detail/comment-dialog/comment-dialog.component';

@NgModule({
  imports: [
    SharedModule,
    TaskRoutingModule
  ],
  declarations: [
    TaskListComponent,
    TaskDetailComponent,
    CommentDialogComponent
  ],
  exports: [
    TaskListComponent,
    TaskDetailComponent,
    SharedModule
  ],
  providers: [],
  entryComponents: [
    CommentDialogComponent
  ]
})
export class TaskModule { }
