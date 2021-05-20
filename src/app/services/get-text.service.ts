import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class GetTextService {

  readonly apiUrl = "http://localhost:3333/";

  constructor(private http: HttpClient) { }

  getText() {
    return this.http.get(this.apiUrl + "text");
  }
}
