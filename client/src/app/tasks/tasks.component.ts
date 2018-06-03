import { Component, OnInit } from '@angular/core';

import { Task }        from '../models/task.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
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
        this.currentPage = tasks["metadata"].currentPage;
        this.totalPages = tasks["metadata"].totalPages;
        this.tasks = tasks["data"]
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
      this.tasks = tasks["data"]
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
