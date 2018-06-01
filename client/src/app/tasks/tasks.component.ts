import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { merge } from "rxjs/observable/merge";

import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';
import { TasksDataSource } from "../services/tasks.datasource";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  task: Task;
  dataSource: TasksDataSource;
  displayedColumns = ['_id', 'short_description', 'description', 'createdAt', 'updatedAt'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(private route: ActivatedRoute, 
              private taskService: TaskService) { }

  ngOnInit() {
    this.task = this.route.snapshot.data["task"];
    this.dataSource = new TasksDataSource(this.taskService);
    this.dataSource.loadTasks(/*this.task._id, '', 'asc', */1, 5);
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 1);

    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 1;

          this.loadTasksPage();
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadTasksPage())
      )
      .subscribe();
  }

  // add(short_description: string): void {
  //   short_description = short_description.trim();

  //   if (!short_description) {
  //     return;
  //   }

  //   this.taskService.addTask({} as Task)
  //     .subscribe(task => {
  //       this.tasks.push(task);
  //     });
  // }

  loadTasksPage() {
    this.dataSource.loadTasks(
      /*this.task._id,
      this.input.nativeElement.value,
      this.sort.direction,*/
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }
}
