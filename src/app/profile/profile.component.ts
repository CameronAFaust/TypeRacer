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
  missedKeys = [];
  private setPositions = {
    1: { x: 57, y: 2 },
    2: { x: 114, y: 2 },
    3: { x: 170, y: 2 },
    4: { x: 227, y: 2 },
    5: { x: 283, y: 2 },
    6: { x: 339, y: 2 },
    7: { x: 395, y: 2 },
    8: { x: 451, y: 2 },
    9: { x: 507, y: 2 },
    0: { x: 563, y: 2 },
    '-': { x: 619, y: 2 },

    q: { x: 88, y: 58 },
    w: { x: 144, y: 58 },
    e: { x: 201, y: 58 },
    r: { x: 257, y: 58 },
    t: { x: 313, y: 58 },
    y: { x: 369, y: 58 },
    u: { x: 426, y: 58 },
    i: { x: 482, y: 58 },
    o: { x: 538, y: 58 },
    p: { x: 594, y: 58 },

    a: { x: 97, y: 115 },
    s: { x: 154, y: 115 },
    d: { x: 210, y: 115 },
    f: { x: 266, y: 115 },
    g: { x: 322, y: 115 },
    h: { x: 379, y: 115 },
    j: { x: 435, y: 115 },
    k: { x: 492, y: 115 },
    l: { x: 548, y: 115 },
    ';': { x: 601, y: 115 },
    '\'': { x: 660, y: 115 },

    z: { x: 127, y: 171 },
    x: { x: 183, y: 171 },
    c: { x: 239, y: 171 },
    v: { x: 295, y: 171 },
    b: { x: 352, y: 171 },
    n: { x: 408, y: 171 },
    m: { x: 464, y: 171 },
    ',': { x: 521, y: 171 },
    '.': { x: 577, y: 171 },
  };

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
    let temp = data.MissedLetters.replace(/'/g, '"');
    temp = temp.replace(/=/g, ':');
    // temp = temp.replace(/(':')/g, '":"');
    // temp = temp.replace(/(':)/g, '":');
    // temp = temp.replace(/(,')/g, ',"');
    // temp = temp.replace(/('})/g, '"}');

    
    temp = JSON.parse(temp);
    // console.log(temp);
    for (const [key, value] of Object.entries(temp)) {
      if (value['N'] !== '0') {
        for (let i = 0; i < parseInt(value['N'], 10); i++) {
          this.missedKeys.push(this.setPositions[key.toLowerCase()]);
        }
      }
    }
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
