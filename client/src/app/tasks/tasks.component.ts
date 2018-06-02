import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[];
  displayedColumns = ['_id', 'short_description', 'description', 'createdAt', 'updatedAt'];
  dataSource = new MatTableDataSource<Task>(this.tasks);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.getTasks();
    this.dataSource.paginator = this.paginator;
  }

  getTasks(): void {
    this.taskService.getTasks()
      .subscribe(tasks => this.tasks = tasks);
  }
}
