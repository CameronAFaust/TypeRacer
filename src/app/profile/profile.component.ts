import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  WPM = 0;
  totalRaces = 0;
  username = '';

  constructor(private router: Router) { }

  async ngOnInit() {
    const currentUser = await Auth.currentUserInfo();
    if (currentUser) {
      this.readUserData(currentUser);
    }
  }

  logout() {
    Auth.signOut();
    this.router.navigateByUrl('/');
  }

  renderData(data) {
    this.WPM = data.WPM / data.TotalRaces;
    this.totalRaces = data.TotalRaces;
    this.username = data.name;
  }

  readUserData(user) {
    const xhr = new XMLHttpRequest();
    const url = `https://19qhdb9la7.execute-api.us-east-2.amazonaws.com/test/people/${user.attributes.email}`;
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        this.renderData(JSON.parse(xhr.response));
      }
    };

    xhr.send();
  }
}
