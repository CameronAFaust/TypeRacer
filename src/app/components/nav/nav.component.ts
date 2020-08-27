import { Component, AfterViewInit } from '@angular/core';
import { LoginPopupComponent } from '../login/login.component';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements AfterViewInit {
  hideNav = false;
  loggedIn = false;

  ngAfterViewInit() {
    this.checkLogin();
  }

  showLogin(): void {
    this.hideNav = this.hideNav ? false : true;
    this.checkLogin();
  }

  async checkLogin() {
    try {
      const cognitoUser = await Auth.currentSession();
      if (cognitoUser.isValid) {
        this.loggedIn = true;
      }
    } catch (error) {
      this.loggedIn = false;
    }
  }
}
