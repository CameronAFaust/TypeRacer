import { Component, OnInit, ContentChildren, QueryList } from '@angular/core';
import { LoginPopupComponent } from '../login/login.component';

@Component({
  selector: 'nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  hideNav = false;
  constructor() { }

  ngOnInit() {
  }

  showLogin(): void {
    this.hideNav = this.hideNav ? false : true;
  }
}
