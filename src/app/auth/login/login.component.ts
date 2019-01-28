import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
@Component({
  selector: 'pdi-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = this.fb.group({
    username: null,
    password: null
  });

  constructor(private fb: FormBuilder, public auth: AuthService) {}

  loginFormSubmit() {
    console.log(this.loginForm);
    this.auth.emailLogin(this.loginForm.value);
    // this.loginForm.reset();
  }
}
