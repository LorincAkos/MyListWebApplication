import { Component, signal } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { LoginDto } from '../../models/dtos/LoginDto';
import { RegisterDto } from '../../models/dtos/RegisterDto';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required,
    ]),
  });

  registerForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required,
    ]),
    email: new FormControl('', [
      Validators.required,
    ]),
  });


  isLogin = signal<boolean>(true);

  constructor(private authService: AuthService, private router: Router) { }


  changeRecordType() {
    this.isLogin.set(!this.isLogin())
  }

  onLoginSubmit() {

    if (this.loginForm.valid) {
      const formData = this.loginForm.value;

      const user: LoginDto = {
        username: formData.username!,
        password: formData.password!,
      }
      this.authService.login(user).subscribe({
        next: (res) => {
          console.log('Login successful');
        this.router.navigate(['/profile']);
        },
        error: (err) => {
          alert('Login failed' );
        },
      });
    }
  }

  onRegisterSubmit() {

    if (this.registerForm.valid) {
      const formData = this.registerForm.value;

      const user: RegisterDto = {
        username: formData.username!,
        password: formData.password!,
        email: formData.email!,
      }
      this.authService.register(user).subscribe({
        next: (response) => {
          console.log('Register successful', response);
          alert("Profile created");
          this.changeRecordType();
        },
        error: (err) => {
          console.error('Registe failed', err);
          alert(err);
        },
      });
    }
  }

  test() {

    this.authService.isAdmin();
  }
}
