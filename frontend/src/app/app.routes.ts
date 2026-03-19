import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { 
    path: 'login', 
    loadComponent: () => import('./features/auth/login/login').then(m => m.Login)
  },
  { 
    path: 'register', 
    loadComponent: () => import('./features/auth/register/register').then(m => m.RegisterComponent)
  },
  { 
    path: 'tasks', 
    canActivate: [authGuard],
    loadComponent: () => import('./features/tasks/task-list/task-list').then(m => m.TaskList)
  },
  { 
    path: 'tasks/new', 
    canActivate: [authGuard],
    loadComponent: () => import('./features/tasks/task-form/task-form').then(m => m.TaskForm)
  },
  { 
    path: 'tasks/edit/:id', 
    canActivate: [authGuard],
    loadComponent: () => import('./features/tasks/task-form/task-form').then(m => m.TaskForm)
  },
  { 
    path: 'tasks/:id', 
    canActivate: [authGuard],
    loadComponent: () => import('./features/tasks/task-detail/task-detail').then(m => m.TaskDetailComponent)
  },
  { path: '**', redirectTo: '/tasks' }
];
