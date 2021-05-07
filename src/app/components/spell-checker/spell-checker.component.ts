import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-spell-checker',
  templateUrl: './spell-checker.component.html',
  styleUrls: ['./spell-checker.component.css']
})

export class SpellCheckerComponent implements OnInit {
  @ViewChild("spellCheckerInput") spellCheckerValue;
  @ViewChildren("testWord") testWord: QueryList<any>;

  public splittedText = "Beowulf, a young warrior in Geatland (southwestern Sweden), comes to the Scyldings' aid, bringing with him 14 of his finest men. Hrothgar once sheltered Beowulf's father during a deadly feud, and the mighty Geat hopes to return the favor while enhancing his own reputation and gaining treasure for his king, Hygelac. At a feast before nightfall of the first day of the visit, an obnoxious, drunken Scylding named Unferth insults Beowulf and claims that the Geat visitor once embarrassingly lost a swimming contest to a boyhood acquaintance na".split(" ")
  // public splittedText = "this is a text for palestinha project".split(" ");
  public inputData:  FormGroup;
  
  public wpmResult: number
  
  public correctWords: number;
  public incorrectWords: number;
  public keyStrokes: number;

  public phraseIndex: number;

  public minutes: number;
  public seconds: number;
  public chronometer: number;

  private startWasClicked: Boolean;
  private timerInterval;


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.phraseIndex = 0;

    this.keyStrokes = 0;
    this.correctWords = 0;
    this.incorrectWords = 0;
    
    this.minutes = 1;
    this.seconds = 0;

    this.startWasClicked = true;

    this.inputData = this.formBuilder.group({
      inputText: []
    });
  } 
  
  testeTexto(text, eventKey) { 
    if (text === null) text = "";

    this.timerStart();

    let checkedWord = text;
    checkedWord = checkedWord.replace(/\s/g, "");


    if (eventKey === " " && checkedWord === this.splittedText[this.phraseIndex]) {

      this.keyStrokes += this.splittedText[this.phraseIndex].length
     
      this.phraseIndex++;
      this.correctWords++;
     
      this.spellCheckerValue.nativeElement.value = null;
      
      this.changeWordToCorrectClass();
    } 
    else if (eventKey === " " && checkedWord !== this.splittedText[this.phraseIndex]){
      this.phraseIndex++;
       this.spellCheckerValue.nativeElement.value = null;
      this.incorrectWords++;

      this.changeWordToIncorrectClass();
    }
  }

  wordsPerMinuteCalc(minutes, seconds) {
    let countdown = 60 - seconds

    if (countdown !== 60) {

      
      if (seconds >= 45) {
        seconds = Math.round(seconds / 60 * 1e2) / 1e2;

      } else {
        seconds = 1;
      }

      this.wpmResult = Math.floor((this.keyStrokes /  5) / seconds);

    }
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
      if (element.nativeElement.className === "current") {
        element.nativeElement.className = "incorrectWord";
      }
    })
  }

 
  timerStart() {
    if(this.startWasClicked) {
      this.timerReset();
     
      this.startWasClicked = false;
     
      this.timerInterval = setInterval(() => {

        this.wordsPerMinuteCalc(this.minutes, this.seconds);

        if (this.minutes === 0 && this.seconds === 0) {
          this.startWasClicked = true;

          this.spellCheckerValue.nativeElement.className = "timeEnded";
          this.spellCheckerValue.nativeElement.value = null;
          this.inputData.disable();

          this.timerStop();
        }
  
        
        if (this.seconds === 0) {
          this.seconds = 60;
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
    this.inputData.enable();

    this.timerStop();
  }

  timerStop() {
    clearInterval(this.timerInterval);
  }

}