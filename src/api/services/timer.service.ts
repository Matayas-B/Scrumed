import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Scrum } from '../models/scrum';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  baseUrl = environment.serviceBaseUrl;

  pauseAndResumeSubject = new Subject<boolean>();

  constructor(private httpClient: HttpClient) { }

  getScrum(scrumId: string): Observable<Scrum> {
    const url = `${this.baseUrl}scrum/get-scrum?id=${scrumId}`;
    const headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.httpClient.get<Scrum>(url, { headers });
  }

  createScrum(scrum: Scrum): Observable<number> {
    const url = `${this.baseUrl}scrum/create-scrum`;
    const headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.httpClient.post<number>(url, scrum, { headers });
  }

  pauseOrResumeScrum(isRunning: boolean) {
    this.pauseAndResumeSubject.next(isRunning);
  }
}
