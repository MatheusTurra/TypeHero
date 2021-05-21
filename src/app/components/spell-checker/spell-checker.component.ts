import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import  { GetTextService } from "../../services/get-text.service";

@Component({
  selector: 'app-spell-checker',
  templateUrl: './spell-checker.component.html',
  styleUrls: ['./spell-checker.component.css']
})

export class SpellCheckerComponent implements OnInit {
  @ViewChild("spellCheckerInput") spellCheckerValue;
  @ViewChildren("testWord") testWord: any;

  public splittedText: any;

  public inputForm:  FormGroup;
  public leaderboardForm: FormGroup;
  public leaderboard: any;
  
  public wpmResult: number
  private counter: number;
  
  public correctWords: number;
  public incorrectWords: number;
  public wordLength: number;
  public isCorrect: boolean;

  public phraseIndex: number;

  public minutes: number;
  public seconds: number;
  public chronometer: number;
  public testIsOver: boolean;

  private startWasClicked: Boolean;
  private timerInterval: any;
  

  constructor(private formBuilder: FormBuilder, private getTextService: GetTextService) { }

  ngOnInit(): void {
    this.getApiText();

    this.phraseIndex = 0;

    this.wordLength = 0;
    this.correctWords = 0;
    this.incorrectWords = 0;
    this.isCorrect = true;

    this.wpmResult = 0
    this.counter = 0;
    
    this.minutes = 1;
    this.seconds = 0;
    this.testIsOver = false;

    this.startWasClicked = true;

    this.showAllLeaderboards();

    this.inputForm = this.formBuilder.group({
      inputText: [],
    });

    this.leaderboardForm = this.formBuilder.group({
      name: ["", [Validators.required]]
    });
  } 

  getApiText() {
     this.getTextService.getText().subscribe( data => {
        this.splittedText = data[0].text.split(" ");
    });
  }


  showAllLeaderboards() {
    this.getTextService.showAllLeaderboard().subscribe(data => {
      this.leaderboard = data[0].values;
    });    
  }
  
  spellChecker(text, eventKey) { 
    if (text === null) text = "";

    this.timerStart();
    let checkedWord = text;
    
    checkedWord = checkedWord.replace(/\s/g, "");

    this.realTimeSpellChecker(eventKey)

    if (eventKey === " " && checkedWord === this.splittedText[this.phraseIndex]) {

      this.wordLength += this.splittedText[this.phraseIndex].length;

      this.phraseIndex++;
      this.correctWords++;
      this.spellCheckerValue.nativeElement.value = null;
      this.counter = 0;
      this.isCorrect = true;

      this.changeWordToCorrectClass();
    } 
    else if (eventKey === " " && checkedWord !== this.splittedText[this.phraseIndex]) {            
      if (checkedWord !== "") {
        this.phraseIndex++;
        this.spellCheckerValue.nativeElement.value = null;
        this.incorrectWords++;
        this.isCorrect = true;

        this.changeWordToIncorrectClass();
      }

      this.spellCheckerValue.nativeElement.value = null;
    }
  }

  realTimeSpellChecker(event) {
    let textSplitInLetters = this.splittedText[this.phraseIndex].split("");
    let wordLenght = textSplitInLetters.length - 1;
    let formattedText = this.formatText(textSplitInLetters[this.counter])
    let formattedUserInput = this.formatText(event);

    if (this.counter > wordLenght) {
       this.counter = wordLenght
     };

    // console.log(formattedText);
    if (formattedUserInput.length <= 1 && event !== " ") {
      if (formattedUserInput === formattedText) {
        this.isCorrect = true;
        this.counter++;
      } else {
        this.isCorrect = false;
      }
    }
  }

  formatText(text) {
    if (text === undefined) text = "";
    let textWhithoutAccent: String;

    textWhithoutAccent = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    return textWhithoutAccent;
  }
  
  calculateWpm(totalWords) {
    this.wpmResult = Math.floor((totalWords / 5) / 1);
  }
  
  changeWordToCorrectClass() {
    this.testWord.forEach(element => {
      if (element.nativeElement.className === "current") {
        element.nativeElement.className = "correctWord";
      }
    });
  }

  changeWordToIncorrectClass() {
    this.testWord.forEach(element => {
      if (element.nativeElement.className === "incorrectSpell" || element.nativeElement.className === "current") {
        element.nativeElement.className = "incorrect";
      }
    });
  }

  changeWordToCurrentClass() {
    this.testWord.forEach(element => {
      if (element.nativeElement.className === "current") {
        element.nativeElement.className = "current";
      }
    });
  }
 
  timerStart() {
    if(this.startWasClicked) {
      this.timerReset();
     
      this.startWasClicked = false;
     
      this.timerInterval = setInterval(() => {

        if (this.minutes === 0 && this.seconds === 0) {
          this.startWasClicked = true;

          this.spellCheckerValue.nativeElement.className = "timeEnded";
          this.spellCheckerValue.nativeElement.value = null;
          this.inputForm.disable();

          this.calculateWpm(this.wordLength);
          this.testIsOver = true;
          this.timerStop();
        }
        
        if (this.seconds === 0) {
          this.seconds = 59;
          this.minutes--;
  
          if (this.minutes < 0) {
            this.seconds = 0;
            this.minutes = 0;
          }
        } else {
          this.seconds--;
        }
      }, 1000);
    }
  }

  timerReset() {
    this.startWasClicked = true;
    this.minutes = 1;
    this.seconds = 0;

    this.spellCheckerValue.nativeElement.className = null;
    this.inputForm.enable();

    this.timerStop();
  }

  timerStop() {
    clearInterval(this.timerInterval);
  }

  saveLeaderboard(name) {
    this.getTextService.insertLeaderboard(name, this.wpmResult);
  }
}