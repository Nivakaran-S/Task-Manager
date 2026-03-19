import { Injectable, signal, Inject, PLATFORM_ID } from '@angular/core';
import { ApiService } from './api';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  currentUser = signal<any>(null);
  isAuthenticated = signal<boolean>(false);

  constructor(
    private api: ApiService, 
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        this.isAuthenticated.set(true);
      }
    }
  }

  register(credentials: any) {
    return this.api.post<{token: string, type: string}>('/auth/register', credentials);
  }

  login(credentials: any) {
    return this.api.post<{token: string, type: string}>('/auth/login', credentials);
  }

  setSession(authResult: {token: string, type: string}) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', authResult.token);
    }
    this.isAuthenticated.set(true);
    this.router.navigate(['/tasks']);
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
    this.isAuthenticated.set(false);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }
}
