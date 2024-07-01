import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BudgetPlannerServiceService } from '../budget-planner-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
}) 
export class LoginComponent implements OnInit {
  loginForm: any;
  registerForm: any;
  activeForm: 'login' | 'register' = 'login';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,private budgetPlannerService: BudgetPlannerServiceService

  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  toggleForm(form: 'login' | 'register') {
    this.activeForm = form;
  }

  login() {
    if (this.loginForm.valid) {
      const storedUser = localStorage.getItem(this.loginForm.value.email);
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.password === this.loginForm.value.password) {
          console.log("Login successful", this.loginForm.value);
          this.budgetPlannerService.setLoggedInUser(user);
          this.router.navigate(['/budget-planner/dashboard']);
        } else {
          this.snackBar.open('Invalid password!', 'Close', { duration: 3000 });
        }
      } else {
        this.snackBar.open('Email not registered!', 'Close', { duration: 3000 });
      }
    } else {
      this.snackBar.open('Invalid email or password!', 'Close', { duration: 3000 });
    }
  }

  register() {
    if (this.registerForm.valid) {
      const user = {
        username: this.registerForm.value.username,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password
      };
      localStorage.setItem(this.registerForm.value.email, JSON.stringify(user));
      console.log("Register info", this.registerForm.value);
      this.snackBar.open('Registration successful!', 'Close', { duration: 3000 });
      setTimeout(() => {
        this.router.navigate(['/budget-planner/login']);
        window.location.reload();
      }, 2000);
    } else {
      this.snackBar.open('Please fill in all fields correctly!', 'Close', { duration: 3000 });
    }
  }
}
