import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
} from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { AuthService } from '../auth.service';
import { User } from './user.types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  hide = true;
  constructor(
    private readonly apollo: Apollo,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}
  ngOnInit(): void {}

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.email.hasError('email')) {
      return 'Not a valid email';
    }
    if (this.email.hasError('notPresent')) {
      return 'The user does not exists with this email password combination';
    }
  }

  login() {
    this.apollo
      .query({
        query: gql`
          query login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              access_token
              user {
                email
                id
                name
              }
            }
          }
        `,
        variables: {
          email: this.email.value,
          password: this.password.value,
        },
      })
      .subscribe(
        (data) => {
          if (!data.errors) {
            this.authService.setToken((data.data as any).login.access_token);
            this.authService.setCurrentUser(
              (data.data as any).login.user as User
            );
            this.router.navigate(['/home']);
          }
        },
        (error) => {
          this.email.setErrors({ notPresent: true });
        }
      );
  }
}
