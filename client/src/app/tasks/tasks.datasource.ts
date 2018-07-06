import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { catchError, finalize } from "rxjs/operators";
import { of } from "rxjs/observable/of";

import { Task } from '../models/task.model';
import { TasksService } from './tasks.service';

export class TasksDataSource implements DataSource<Task> {
    private tasksSubject = new BehaviorSubject<Task[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();
    
    constructor(private taskService: TasksService) { }
  
    loadTasks(/*taskId:string, filter:string, sortDirection:string, */pageIndex: number, pageSize: number) {
      this.loadingSubject.next(true);
      
      this.taskService.getTasks(/*taskId, filter, sortDirection, */pageIndex, pageSize).pipe(
          catchError(() => of([])),
          finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(tasks => this.tasksSubject.next(tasks));
    }
  
    connect(collectionViewer: CollectionViewer): Observable<Task[]> {
        console.log("Connecting data source");
        return this.tasksSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.tasksSubject.complete();
        this.loadingSubject.complete();
    }
  }
  