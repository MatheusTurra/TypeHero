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

  public phraseIndex;


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.phraseIndex = 0;
    
    this.inputData = this.formBuilder.group({
      inputText: []
    });
  } 

  testeTexto(text, eventKey) { 
    if (text === null) text = "";

    let checkedWord = text;

    checkedWord = checkedWord.replace(/\s/g, "");

    if (eventKey === " " && checkedWord === this.splittedText[this.phraseIndex]) {
      this.phraseIndex++;
      this.spellCheckerValue.nativeElement.value = null;

      this.testWord.forEach(element => {
        if (element.nativeElement.className === "current") {
          element.nativeElement.className = "correct";
        }
      })
    }
  }
}