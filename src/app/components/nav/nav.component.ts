import { Component, OnInit, ContentChildren, QueryList } from '@angular/core';
import { LoginPopupComponent } from '../login/login.component';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  hideNav = false;
  loggedIn = false;
  constructor() { }

  async ngOnInit() {
    if (await Auth.currentAuthenticatedUser()) {
      this.loggedIn = false;
    }
  }

  showLogin(): void {
    this.hideNav = this.hideNav ? false : true;
  }
}
