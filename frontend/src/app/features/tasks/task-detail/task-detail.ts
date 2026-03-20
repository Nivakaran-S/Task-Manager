import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Task, TaskItem } from '../../../core/services/task';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.scss'
})
export class TaskDetailComponent implements OnInit {
  task = signal<TaskItem | null>(null);
  loading = signal<boolean>(true);
  errorMessage = signal<string>('');

  constructor(
    private route: ActivatedRoute,
    private taskService: Task,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.fetchTaskDetails(+id);
      } else {
        this.loading.set(false);
        this.errorMessage.set('Invalid task ID.');
      }
    });
  }

  fetchTaskDetails(id: number): void {
    this.loading.set(true);
    this.errorMessage.set('');
    
    this.taskService.getTaskById(id).subscribe({
      next: (data) => {
        if (!data) {
          this.errorMessage.set('Task not found.');
        } else {
          this.task.set(data);
        }
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Fetch error:', err);
        this.errorMessage.set('Could not load task details.');
        this.loading.set(false);
      }
    });
  }

  deleteTask(): void {
    const currentTask = this.task();
    if (currentTask && currentTask.id && confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(currentTask.id).subscribe(() => {
        this.router.navigate(['/tasks']);
      });
    }
  }
}