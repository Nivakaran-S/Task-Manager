import { Injectable, signal } from '@angular/core';
import { ApiService } from './api';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environment';

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
    return new Observable<TaskItem>(observer => {
      const token = localStorage.getItem('token');
      fetch(`${environment.apiUrl}/tasks/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(async res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        observer.next(data);
        observer.complete();
      })
      .catch(err => observer.error(err));
    });
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
