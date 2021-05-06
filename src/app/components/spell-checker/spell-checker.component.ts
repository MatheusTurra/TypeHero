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
  
  public splittedText = "this is a text for palestrinha project".split(" ");
  public inputData:  FormGroup;

  public phraseIndex: number;

  public minutes: number;
  public seconds: number;
  public chronometer: number;


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.phraseIndex = 0;
    
    this.minutes = 1;
    this.seconds = 0;
    
    this.inputData = this.formBuilder.group({
      inputText: []
    });
  } 
  
  testeTexto(text, eventKey) { 
    if (text === null) text = "";

    let checkedWord = text;
    // this.changeWordToCorrectClass();
    checkedWord = checkedWord.replace(/\s/g, "");

    if (eventKey === " " && checkedWord === this.splittedText[this.phraseIndex]) {
      this.phraseIndex++;
      this.spellCheckerValue.nativeElement.value = null;
      
      this.changeWordToCorrectClass();
    } 
    else if (eventKey === " " && checkedWord !== this.splittedText[this.phraseIndex]){
      // TRANSFORMAR EM FUNÇÃO 
      this.phraseIndex++;
      this.spellCheckerValue.nativeElement.value = null;

      this.changeWordToIncorrectClass();
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
    
    let secondsInterval = setInterval(() => {

      if (this.minutes === 0 && this.seconds === 0) {
        console.log("ACABOOU");
        clearInterval(secondsInterval);
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