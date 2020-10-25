import { Component, OnInit, ɵConsole } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  hide = true;
  passwordConfirm = new FormControl('', [Validators.required]);
  constructor(
    private readonly apollo: Apollo,
    private readonly router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );
  }
  get f() {
    return this.registerForm.controls;
  }

  canSendForm() {
    return (
      this.registerForm.controls.email.valid &&
      this.registerForm.controls.email.value !== '' &&
      this.registerForm.controls.username.valid &&
      this.registerForm.controls.username.value !== '' &&
      this.registerForm.controls.password.valid &&
      this.registerForm.controls.password.value !== '' &&
      this.registerForm.controls.confirmPassword.valid &&
      this.registerForm.controls.confirmPassword.value !== ''
    );
  }
  onSubmit() {
    if (this.canSendForm()) {
      this.apollo
        .mutate({
          mutation: gql`
            mutation CreateUser($createUserInput: CreateUserInput!) {
              createUser(createUserInput: $createUserInput) {
                id
                name
                email
              }
            }
          `,
          variables: {
            createUserInput: {
              name: this.registerForm.controls.username.value,
              email: this.registerForm.controls.email.value,
              password: this.registerForm.controls.password.value,
            },
          },
        })
        .subscribe(
          (data) => {
            if (!data.errors) {
              this.router.navigate(['/login']);
              console.log(data);
            }
          },
          (error) => {
            this.registerForm.controls.email.setErrors({ aleradyExists: true });
          }
        );
    }
  }
}

function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
