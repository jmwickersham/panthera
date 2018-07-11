import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Task } from '../../models/task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})

export class TaskDetailComponent implements OnInit {
  @Input() task: Task;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private location: Location
  ) { }

  ngOnInit(): void {
    if(this.route.snapshot.paramMap.get('id') != 'new') {
      this.getTask();
    }    
  }

  getTask(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.taskService.getTask(id)
    .subscribe(task => this.task = task);
  }

  addTask(task: Task): void {
    if (!task) { 
      return; 
    }
    this.taskService.addTask(task)
      .subscribe(task => this.task = task);
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
}
