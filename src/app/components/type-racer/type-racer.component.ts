import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';

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
  tempText = 'I will hazard a prediction. When you are 80 years old, and in a quiet moment of reflection narrating for only yourself the most personal version of your life story, the telling that will be most compact and meaningful will be the series of choices you have made. In the end, we are our choices. Build yourself a great story.';
  letters = this.tempText.split('');
  letterAt = 0;
  words = this.tempText.split(' ');
  wordInt = 0;

  wpm = 0;
  missedLetters = [];

  correctHighlight = '';
  incorrectHighlight = '';
  constructor() { }

  ngAfterViewInit() {
    this.text.nativeElement.value = this.tempText;
    this.inputControl.valueChanges.subscribe((val) => {
      this.handleInput(val);
    });
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
      this.missedLetters.push(this.letters[this.letterAt]);
    }
    // text is done
    if (this.wordInt === this.words.length) {
      console.log('Done');
    }
  }

  correctMark(letter: string) {
    this.correctHighlight += letter;
    this.incorrectHighlight = '';
  }

  incorrectMark() {
    this.incorrectHighlight = this.letters[this.letterAt];
  }
}
