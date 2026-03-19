import { Injectable, signal } from '@angular/core';
import { ApiService } from './api';
import { Observable, tap } from 'rxjs';

export interface TaskItem {
  id?: number;
  title: string;
  description: string;
  status: string;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root',
})
export class Task {
  tasks = signal<TaskItem[]>([]);

  constructor(private api: ApiService) {}

  getAllTasks(): Observable<TaskItem[]> {
    return this.api.get<TaskItem[]>('/tasks').pipe(
      tap(tasks => this.tasks.set(tasks))
    );
  }

  getTaskById(id: number): Observable<TaskItem> {
    return this.api.get<TaskItem>(`/tasks/${id}`);
  }

  createTask(task: TaskItem): Observable<TaskItem> {
    return this.api.post<TaskItem>('/tasks', task).pipe(
      tap(newTask => this.tasks.update(tasks => [...tasks, newTask]))
    );
  }

  updateTask(id: number, task: TaskItem): Observable<TaskItem> {
    return this.api.put<TaskItem>(`/tasks/${id}`, task).pipe(
      tap(updatedTask => 
        this.tasks.update(tasks => tasks.map(t => t.id === id ? updatedTask : t))
      )
    );
  }

  deleteTask(id: number): Observable<void> {
    return this.api.delete<void>(`/tasks/${id}`).pipe(
      tap(() => 
        this.tasks.update(tasks => tasks.filter(t => t.id !== id))
      )
    );
  }
}
