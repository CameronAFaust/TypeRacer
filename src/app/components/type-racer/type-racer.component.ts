import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

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
  // tslint:disable-next-line: max-line-length
  tempText = 'I will hazard a prediction. When you are 80 years old, and in a quiet moment of reflection narrating for only yourself the most personal version of your life story, the telling that will be most compact and meaningful will be the series of choices you have made. In the end, we are our choices. Build yourself a great story.';
  letters = this.tempText.split('');
  letterAt = 0;
  words = this.tempText.split(' ');
  wordInt = 0;

  correctHighlight = '';
  incorrectHighlight = '';
  constructor() { }

  ngAfterViewInit() {
    this.text.nativeElement.value = this.tempText;
    this.userInput.nativeElement.addEventListener('keyup', (event) => {
      if (event.key.length === 1) {
        this.handleInput(event);
      }
    });
    // https://stackblitz.com/edit/angular-gh-challenge-1-rnsorv?file=src%2Fapp%2Fapp.component.ts
    // import { Observable } from 'rxjs';
    // this.user$ = this.userName.valueChanges.pipe(switchMap((val) => {
    //   return this.userservice.fetchUser(val)
    // }))
  }
  handleInput(event) {
    // console.log('word = ' + this.wordInt);
    // console.log('letter = ' + this.letterAt);
    // console.log('==');
    if (event.key === ' ') {
      if (this.userInput.nativeElement.value === this.words[this.wordInt] + ' ') {
        this.correctMark(this.letters[this.letterAt]);
        this.userInput.nativeElement.value = '';
        this.wordInt++;
        this.letterAt++;
      }
    } else if (event.key === this.letters[this.letterAt]) {
      if (this.words[this.wordInt].startsWith(this.userInput.nativeElement.value)) {
        this.correctMark(this.letters[this.letterAt]);
        this.letterAt++;
      }
    } else if (event.key.length === 1) {
      this.incorrectMark();
    }
    if (this.wordInt === this.words.length) {
      console.log('Done');
    }
  }

  // Type same letter adds to the highlight
  correctMark(letter: string) {
    this.correctHighlight += letter;
    this.incorrectHighlight = '';
  }

  incorrectMark() {
    this.incorrectHighlight = this.letters[this.letterAt];
  }
}
