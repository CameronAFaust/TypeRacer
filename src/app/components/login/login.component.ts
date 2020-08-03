import { Component, OnInit, ChangeDetectorRef, Input, ViewChild, ViewChildren } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

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

  constructor(private ref: ChangeDetectorRef) { }
  ngOnInit() {
  }

  hide(evt) {
    if (evt.target.className === 'backdrop') {
      this.hidden = true;
    }
  }
}
