import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../../core/services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  loginForm: FormGroup;
  errorMessage: string = '';
  isLoading = false;

  constructor(private fb: FormBuilder, private authService: Auth, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.errorMessage = '';
      this.isLoading = true;
      
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.authService.setSession(res);
        },
        error: (err) => {
          this.errorMessage = err.message || 'Invalid username or password.';
          this.isLoading = false;
        }
      });
    }
  }
}
