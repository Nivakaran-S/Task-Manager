import { Component, OnInit, signal } from '@angular/core';
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
  isEditMode = signal(false);
  taskId = signal<number | undefined>(undefined);
  isLoading = signal(false);
  isSubmitting = signal(false);
  errorMessage = signal('');

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
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode.set(true);
        this.taskId.set(+id);
        this.loadTask(+id);
      } else {
        this.isLoading.set(false);
      }
    });
  }

  loadTask(id: number) {
    this.isLoading.set(true);
    this.errorMessage.set('');
    
    this.taskService.getTaskById(id).subscribe({
      next: (task) => {
        if (task) {
          this.taskForm.patchValue({
            title: task.title,
            description: task.description,
            status: task.status
          });
        } else {
          this.errorMessage.set('Task not found.');
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('TaskForm fetch error:', err);
        this.errorMessage.set('Failed to load task details');
        this.isLoading.set(false);
      }
    });
  }

  onSubmit() {
    if (this.taskForm.invalid) return;

    this.isSubmitting.set(true);
    this.errorMessage.set('');
    const taskData: TaskItem = this.taskForm.value;
    const currentTaskId = this.taskId();

    if (this.isEditMode() && currentTaskId) {
      this.taskService.updateTask(currentTaskId, taskData).subscribe({
        next: () => this.router.navigate(['/tasks']),
        error: (err) => {
          this.errorMessage.set(err.message || 'Failed to update task');
          this.isSubmitting.set(false);
        }
      });
    } else {
      this.taskService.createTask(taskData).subscribe({
        next: () => this.router.navigate(['/tasks']),
        error: (err) => {
          this.errorMessage.set(err.message || 'Failed to create task');
          this.isSubmitting.set(false);
        }
      });
    }
  }
}
