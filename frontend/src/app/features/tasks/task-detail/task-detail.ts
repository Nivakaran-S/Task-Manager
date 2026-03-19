import { Component, OnInit } from '@angular/core';
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
  task: TaskItem | null = null;
  loading: boolean = true;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private taskService: Task,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.fetchTaskDetails(+id);
      }
    });
  }

  fetchTaskDetails(id: number): void {
    this.taskService.getTaskById(id).subscribe({
      next: (data) => {
        this.task = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Could not load task details.';
        this.loading = false;
      }
    });
  }

  deleteTask(): void {
    if (this.task && this.task.id && confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(this.task.id).subscribe(() => {
        this.router.navigate(['/tasks']);
      });
    }
  }
}