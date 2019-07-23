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

  updateScrumState = this.socket.fromEvent('scrumStateChanged');
  changeActiveGuestTurn = this.socket.fromEvent('nextGuestChanged');
  shareCurrentScrumState = this.socket.fromEvent('shareCurrentScrumState');

  constructor(
    private httpClient: HttpClient,
    private socket: Socket
  ) { }

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

  getCurrentTurnTime(scrumId: string) {
    this.getCurrentTimeSubject.next(scrumId);
  }

  /* Sockets Emit Methods */
  joinScrumRoom(scrumId: string) {
    this.socket.emit('joinScrumIdRoom', scrumId);
  }

  moveToNextTurn(scrumId: string) {
    this.socket.emit('changeActiveGuestTurn', scrumId);
  }

  sendCurrentStateToServer(scrumId: string, scrumState: boolean, currentTime: string) {
    this.socket.emit('getScrumState', {
      scrumId: scrumId,
      isPaused: scrumState,
      minutes: currentTime.substr(0, 2),
      seconds: currentTime.substr(2, 2)
    });
  }

  getCurrentScrumState(scrumId: string) {
    this.socket.emit('getUpdatedScrumState', scrumId);
  }
}
