import { Injectable } from '@angular/core';
import { Observable, of, Subject, ObservableLike } from 'rxjs';
import { Scrum } from '../models/scrum';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  baseUrl = environment.serviceBaseUrl;

  getCurrentTimeSubject = new Subject<string>();
  changeScrumStateSubject = new Subject<object>();

  constructor(
    private httpClient: HttpClient,
    private socket: Socket
  ) { 
    /* Sockets Listener Methods */
    this.socket.fromEvent('scrumStateChanged').subscribe(data => {
      this.pauseOrResumeScrum(data);
    })
  }

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

  getCurrentTurnTime() {
    this.getCurrentTimeSubject.next();
  }

  pauseOrResumeScrum(scrumData: object, wasStarted: boolean = false) {
    this.changeScrumStateSubject.next(scrumData);
  }

  /* Sockets Emit Methods */
  sendCurrentTimeToServer(scrumState: boolean, currentTime: string) {
    this.socket.emit('changeScrumState', {
      isPaused: scrumState,
      minutes: currentTime.substr(0, 2),
      seconds: currentTime.substr(2, 2)
    });
  }
}
