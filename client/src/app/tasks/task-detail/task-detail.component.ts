import { Component, OnInit, Input, Inject } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Task } from '../../models/task.model';
import { Comment } from '../../models/comment.model';
import { TaskService } from '../task.service';

export interface DialogData {
  commentText: string;
}

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})

export class TaskDetailComponent implements OnInit {
  task$: Observable<Task>;
  commentText: string;

  @Input() task: Task;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private location: Location,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if(this.route.snapshot.paramMap.get('id') != 'new') {
      this.task$ = this.getTask();
    }    
  }

  getTask() {
    return this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const id = params.get('id');
        return this.taskService.getTask(id);
      })
    );
  }

  addTask(task: Task): void {
    if (!task) { 
      return; 
    }
    this.taskService.addTask(task)
      .subscribe(task => this.task = task);
  }

  addComment(task, comment: Comment): void {
    if (!comment) { 
      return; 
    }
    this.taskService.addComment(task._id, comment);
  }

  updateTask(task: Task): void {
    this.taskService.updateTask(this.task)
      .subscribe();
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(this.task)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(commentDialog, {
      width: '250px',
      data: { commentText: this.commentText}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.addComment(this.task$, result);
    });
  }
}

@Component({
  selector: 'comment-dialog',
  templateUrl: 'comment-dialog.html',
})
export class commentDialog {

  constructor(
    public dialogRef: MatDialogRef<commentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
