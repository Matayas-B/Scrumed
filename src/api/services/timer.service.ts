import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Scrum } from '../models/scrum';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  baseUrl = environment.serviceBaseUrl;

  constructor(private httpClient: HttpClient) { }

  getScrum(): Observable<Scrum> {
    const url = `${this.baseUrl}scrum`;
    const headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.httpClient.get<Scrum>(url, { headers });
  }
}
