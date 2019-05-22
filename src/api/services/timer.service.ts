import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Scrum } from '../models/scrum';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  constructor() { }

  getCurrentTime(): Observable<Scrum> {
    var newScrum: Scrum = { remainingTime: new Date(), minutesPerGuest: 10};
    return of(newScrum);
  }
}
