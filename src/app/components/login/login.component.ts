import { Component, OnInit, ChangeDetectorRef, Input, ViewChild, ViewChildren } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Auth } from 'aws-amplify';
import { NavComponent } from '../nav/nav.component';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'login-popup',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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

  constructor(private ref: ChangeDetectorRef, private nav: NavComponent) { }

  ngOnInit() {
  }

  async login() {
    const login = this.loginForm.value;
    try {
      const user = await Auth.signIn(login.username, login.password);
      // this.hidden = true;
      this.nav.showLogin();
      console.log(await Auth.currentUserPoolUser());
    } catch (error) {
      console.log('error signing in', error);
    }
  }

  async signup() {
    const signup = this.registerForm.value;
    try {
      const user = await Auth.signUp({
        username: signup.username,
        password: signup.password,
        attributes: {
          email: signup.email,
        }
      });
      // console.log(user);
      // this.hidden = true;
      this.nav.showLogin();
    } catch (error) {
      console.log('error signing up:', error);
    }
  }

  hide(evt) {
    if (evt.target.className === 'backdrop') {
      this.hidden = true;
      this.nav.showLogin();
    }
  }
}
