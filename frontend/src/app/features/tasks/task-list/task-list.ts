import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CdkDragDrop, DragDropModule, CdkDrag, CdkDropList, CdkDropListGroup, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task, TaskItem } from '../../../core/services/task';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterModule, DragDropModule, CdkDropListGroup, CdkDropList, CdkDrag],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss'
})
export class TaskList implements OnInit {
  isLoading = signal<boolean>(true);
  
  // Create computed signals for purely reactive and memoized array derivations
  todoTasks = computed(() => this.taskService.tasks().filter(t => t.status === 'TO_DO'));
  inProgressTasks = computed(() => this.taskService.tasks().filter(t => t.status === 'IN_PROGRESS'));
  doneTasks = computed(() => this.taskService.tasks().filter(t => t.status === 'DONE'));

  constructor(public taskService: Task, public auth: Auth) {}

  ngOnInit() {
    this.taskService.getAllTasks().subscribe({
      next: () => this.isLoading.set(false),
      error: () => this.isLoading.set(false)
    });
  }

  logout() {
    this.auth.logout();
  }

  deleteTask(id: number | undefined) {
    if (id && confirm('Delete this task?')) {
      this.taskService.deleteTask(id).subscribe();
    }
  }

  onDrop(event: CdkDragDrop<TaskItem[]>, newStatus: string) {
    if (event.previousContainer !== event.container) {
      const task = event.previousContainer.data[event.previousIndex];
      if (!task || !task.id) return;

      // Swap array elements optimistically for an instant UI update
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // Reconcile status in the backend
      const updatedTask = { ...task, status: newStatus };
      this.taskService.updateTask(task.id, updatedTask).subscribe();
    }
  }
}
