import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-spell-checker',
  templateUrl: './spell-checker.component.html',
  styleUrls: ['./spell-checker.component.css']
})
export class SpellCheckerComponent implements OnInit {
  public text = "isso é um texto teste para o projeto palestrinha"; 

  public inputData:  FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.inputData = this.formBuilder.group({
      inputText: []
    });
  } 

  testeTexto(text) {
    let test = [];
    let splittedText = [];
    splittedText = this.text.split(" ")
    test.push(text);
    console.log(text == splittedText[0]);

    console.log(test,splittedText[0])
  }
}
