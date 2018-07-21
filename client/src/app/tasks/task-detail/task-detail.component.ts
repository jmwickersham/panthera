import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { switchMap, subscribeOn } from 'rxjs/operators';
import { MatDialog } from '@angular/material';

import { Task } from '../../models/task.model';
import { Comment } from '../../models/comment.model';
import { TaskService } from '../task.service';
import { CommentDialogComponent } from './comment-dialog/comment-dialog.component';

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
  comment$: Observable<Comment>;
  commentText: string;

  @Input() task: Task;
  comment: Comment;
  newTask: object = {
    short_description: '',
    description: ''
  };

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

  addComment(taskID, comment: string): void {
    if (!comment) { 
      return; 
    }
    this.taskService.addComment(taskID, comment)
      .subscribe(comment => this.comment = comment);;
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
    let dialogRef = this.dialog.open(CommentDialogComponent, {
      data: { commentText: this.commentText}
    });

    dialogRef.afterClosed().subscribe(result => {
      let taskID = this.route.snapshot.paramMap.get('id');
      console.log(`The dialog was closed - ${result} for ${taskID}`);
      this.addComment(taskID, result);
    });
  }
}
