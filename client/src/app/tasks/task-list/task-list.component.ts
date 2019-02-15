import { Component, OnInit } from '@angular/core';

import { Task } from '../../models/task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[];
  totalPages: number;
  currentPage: number;
  
  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks()
      .subscribe(tasks => {
        console.log(tasks);
        this.currentPage = tasks["pageable"].pageNumber;
        this.totalPages = tasks["totalPages"];
        this.tasks = tasks["content"];
        //this.currentPage = tasks["metadata"].currentPage;
        //this.totalPages = tasks["metadata"].totalPages;
        //this.tasks = tasks["data"]
      });
  }

  getTaskPage(page): void {
    if (page * 1 < 1) {
      page = 1;
    }
    else if (page > this.totalPages) {
      page = this.totalPages;
    }
    this.currentPage = page;
    this.taskService.getTasks(page)
    .subscribe(tasks => {
      //this.tasks = tasks["data"]
      this.tasks = tasks["content"]

    });
  }

  add(short_description: string): void {
    short_description = short_description.trim();

    if (!short_description) { 
      return; 
    }
    
    this.taskService.addTask({  } as Task)
      .subscribe(task => {
        this.tasks.push(task);
      });
  }
}
