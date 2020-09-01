import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Auth } from 'aws-amplify';
import { resolve } from 'url';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'type-racer',
  templateUrl: './type-racer.component.html',
  styleUrls: ['./type-racer.component.scss']
})
export class TypeRacerComponent implements AfterViewInit {
  @ViewChild('text', { static: false }) text: ElementRef;
  @ViewChild('userInput', { static: false }) userInput: ElementRef;
  @ViewChild('highlightText', { static: false }) highlightText: ElementRef;
  @ViewChild('incorrectText', { static: false }) incorrectText: ElementRef;
  inputControl = new FormControl('');
  // tslint:disable-next-line: max-line-length
  tempText = 'I will. hazard a prediction. When you are 80 years old, and in a quiet moment of reflection narrating for only yourself the most personal version of your life story, the telling that will be most compact and meaningful will be the series of choices you have made.'; //In the end, we are our choices. Build yourself a great story.';
  letters = this.tempText.split('');
  letterAt = 0;
  words = this.tempText.split(' ');
  wordInt = 0;

  percent = .20;

  wpm = 0;
  missedLetters = [];
  totalTime: number = 0;
  seconds: number = 6;
  displaySeconds = '';
  minutes: number = 0;
  totalRaces = 1;

  correctHighlight = '';
  incorrectHighlight = '';
  timer;
  countdown;
  isCountdown = true;

  charStyle = '70px';
  charTop = 70;

  countDown() {
    this.countdown = setInterval(() => {
      this.seconds--;
      if (this.seconds < 10) {
        this.displaySeconds = '0' + this.seconds;
      } else {
        this.displaySeconds = this.seconds + '';
      }
      if (this.seconds === 0) {
        clearTimeout(this.countdown);
        this.isCountdown = false;
        this.startTimer();
      }
    }, 1000);
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.totalTime++;
      this.seconds = this.totalTime % 60;
      if (this.seconds < 10) {
        this.displaySeconds = '0' + this.seconds;
      } else {
        this.displaySeconds = this.seconds + '';
      }
      // tslint:disable-next-line: radix
      this.minutes = parseInt((this.totalTime / 60) + '');
      // tslint:disable-next-line: radix
      this.wpm = parseInt((this.wordInt / this.totalTime) * 100 + '');
      // console.log(this.wpm);
    }, 1000);
  }

  ngAfterViewInit() {
    console.log(this.words);
    this.text.nativeElement.value = this.tempText;
    this.inputControl.valueChanges.subscribe((val) => {
      if (this.isCountdown) {
        this.userInput.nativeElement.value = '';
      } else {
        this.handleInput(val);
      }
    });
    this.countDown();
    // this.startTimer();
  }

  handleInput(event) {
    const inputChar = event[event.length - 1];
    // if input === space to extra checks
    if (inputChar === ' ') {
      // if input === expected
      if (this.userInput.nativeElement.value === this.words[this.wordInt] + ' ') {
        // mark it correct, then setup for next word
        this.correctMark(this.letters[this.letterAt]);
        this.userInput.nativeElement.value = '';
        this.wordInt++;
        this.letterAt++;
      }
      // if input === expected
    } else if (inputChar === this.letters[this.letterAt]) {
      // check to see if the beginning of word is correct
      if (this.words[this.wordInt].startsWith(this.userInput.nativeElement.value)) {
        // mark it, go to next letter
        this.correctMark(this.letters[this.letterAt]);
        this.letterAt++;
      }
    } else {
      // input !== expected letter, mark it, then add the letter to the missedLetters array
      this.incorrectMark();
      if (this.letters[this.letterAt] !== this.missedLetters[this.missedLetters.length - 1]) {
        this.missedLetters.push(this.letters[this.letterAt]);
      }
    }
    // text is done
    if (this.wordInt === this.words.length) {
      this.finish();
    }
  }

  correctMark(letter: string) {
    this.correctHighlight += letter;
    this.incorrectHighlight = '';
    if (((this.words.length - 1) * this.percent) <= this.wordInt && this.charTop < 290) {
      this.percent = this.percent + .20;
      this.charTop = this.charTop + 35;
      this.charStyle = this.charTop + 'px';
    }
  }

  incorrectMark() {
    this.incorrectHighlight = this.letters[this.letterAt];
  }

  async finish() {
    const currentUser = await Auth.currentUserInfo();
    const xhr = new XMLHttpRequest();
    const url =
      `https://19qhdb9la7.execute-api.us-east-2.amazonaws.com/test/people/${currentUser.attributes.email}`;
    xhr.open('GET', url, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        const res = JSON.parse(xhr.response);
        const temp = this.convertMissed(res.MissedLetters, this.getLetterCount(this.missedLetters));
        const userData = {
          userId: currentUser.attributes.email,
          name: currentUser.username,
          WPM: (this.wpm + parseInt((res.WPM ? res.WPM : 0), 10)) + '',
          TotalRaces: (this.totalRaces + parseInt((res.TotalRaces ? res.TotalRaces : 0), 10)) + '',
          MissedLetters: temp
        };
        this.postData(userData);
      }
    };
    xhr.send();

    clearTimeout(this.timer);
  }

  postData(userData) {
    const xhr = new XMLHttpRequest();
    const url =
      'https://19qhdb9la7.execute-api.us-east-2.amazonaws.com/test/people';
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    const data = JSON.stringify(userData);
    console.log(userData);
    console.log(data);

    xhr.send(data);
  }

  convertMissed(server, local) {
    let temp = server.replace(/'/g, '"');
    temp = temp.replace(/=/g, ':');
    temp = JSON.parse(temp);

    // console.log(temp);

    for (const [key, value] of Object.entries(temp)) {
      const num = local[key] ? local[key] : 0;
      temp[key]['N'] = (parseInt(value['N'], 10) + num) + '';
    }
    return temp;
  }

  getLetterCount(usersMissedKeys) {
    let counts = {};
    usersMissedKeys.forEach((x) => {
      if (x !== ' ') {
        counts[x] = (counts[x] || 0) + 1;
      }
    });
    return counts;
  }
}
