import { Component, OnInit, ChangeDetectorRef, Input, ViewChild, ViewChildren } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Amplify, Auth } from 'aws-amplify';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'login-popup',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginPopupComponent implements OnInit {
  @Input() hidden = true;
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  registerForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });
  // , { validators: this.passwordMatchValidator });

  // passwordMatchValidator(g: FormGroup) {
  //   return g.get('password').value === g.get('passwordConfirm').value
  //     ? null : { 'mismatch': true };
  // }

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit() {
    Amplify.configure({
      Auth: {
        identityPoolId: 'us-east-2_NgvUMaC8q', // Amazon Cognito Identity Pool ID
        region: 'us-east-2', // Amazon Cognito Region
      }
    });
  }

  async login() {
    const login = this.loginForm.value;
    const user2 = await Auth.signIn(login.username, login.password)
      .then(user => console.log(user))
      .catch(err => console.log(err));
  }

  async signup() {
    const signup = this.registerForm.value;
    const userT = await Auth.signUp({
      username: signup.username,
      password: signup.password,
      attributes: {
        email: signup.email
      }
    })
      .then(user => console.log(user))
      .catch(err => console.log(err));
  }

  hide(evt) {
    if (evt.target.className === 'backdrop') {
      this.hidden = true;
    }
  }
}
