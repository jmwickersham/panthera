import { Component, OnInit } from '@angular/core';

import { Task } from './tasks';
import { TaskService } from '../services/task.service';

declare var jQuery: any;

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[];
  
  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.getTasks();
    jQuery('table').tablesort();
  }

  getTasks(): void {
    this.taskService.getTasks()
      .subscribe(tasks => this.tasks = tasks);
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
