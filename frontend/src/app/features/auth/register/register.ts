import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../../core/services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  isLoading = false;

  constructor(private fb: FormBuilder, private authService: Auth, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.errorMessage = '';
      this.successMessage = '';
      this.isLoading = true;
      
      this.authService.register(this.registerForm.value).subscribe({
        next: (res) => {
          this.successMessage = 'Registration successful! Redirecting...';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1500);
        },
        error: (err) => {
          this.errorMessage = err.message || 'Registration failed. Username might be taken.';
          this.isLoading = false;
        }
      });
    }
  }
}