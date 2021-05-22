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

  insertLeaderboard(name, wordsPerMinute) {
    const toJson = {
      "name": name, 
      "wordsPerMinute": wordsPerMinute
    }    
    return this.http.post(this.apiUrl + "leaderboards", toJson).subscribe();
  }

  showAllLeaderboard() {
    return this.http.get(this.apiUrl + "leaderboards");
  }
}
