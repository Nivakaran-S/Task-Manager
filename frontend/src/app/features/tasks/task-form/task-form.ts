import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Task, TaskItem } from '../../../core/services/task';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss'
})
export class TaskForm implements OnInit {
  taskForm: FormGroup;
  isEditMode = false;
  taskId?: number;
  isLoading = false;
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private taskService: Task,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', [Validators.maxLength(500)]],
      status: ['TO_DO', Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.taskId = +params['id'];
        this.loadTask(this.taskId);
      }
    });
  }

  loadTask(id: number) {
    this.isLoading = true;
    this.taskService.getTaskById(id).subscribe({
      next: (task) => {
        this.taskForm.patchValue({
          title: task.title,
          description: task.description,
          status: task.status
        });
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load task details';
        this.isLoading = false;
      }
    });
  }

  onSubmit() {
    if (this.taskForm.invalid) return;

    this.isSubmitting = true;
    this.errorMessage = '';
    const taskData: TaskItem = this.taskForm.value;

    if (this.isEditMode && this.taskId) {
      this.taskService.updateTask(this.taskId, taskData).subscribe({
        next: () => this.router.navigate(['/tasks']),
        error: (err) => {
          this.errorMessage = err.message || 'Failed to update task';
          this.isSubmitting = false;
        }
      });
    } else {
      this.taskService.createTask(taskData).subscribe({
        next: () => this.router.navigate(['/tasks']),
        error: (err) => {
          this.errorMessage = err.message || 'Failed to create task';
          this.isSubmitting = false;
        }
      });
    }
  }
}
