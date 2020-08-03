import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'high-scores',
  templateUrl: './high-scores.component.html',
  styleUrls: ['./high-scores.component.scss']
})
export class HighScoresComponent implements OnInit {
  hsData = [];
  constructor() { }

  ngOnInit() {
    // get Data

    // dummy data
    this.hsData = [
      { name: 'Jimmy', time: '0:30', wpm: '170' },
      { name: 'Bob', time: '0:32', wpm: '165' },
      { name: 'Tommy', time: '0:35', wpm: '150' },
      { name: 'Joe', time: '0:40', wpm: '129' },
      { name: 'xXx_EpicGamer_xXx', time: '1:20', wpm: '70' },
      { name: 'Jeff2', time: '1:25', wpm: '67' },
      { name: 'Terry', time: '1:26', wpm: '66' },
      { name: 'John', time: '1:45', wpm: '40' },
      { name: 'wilson', time: '1:53', wpm: '35' },
      { name: 'Boomer', time: '2:40', wpm: '10' },
    ];
  }

}
