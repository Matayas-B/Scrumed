import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Scrum } from '../models/scrum';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  constructor() { }

  getScrum(): Observable<Scrum> {
    var newScrum: Scrum = { totalTime: new Date(2019, 1, 15, 10, 11, 0), minutesPerGuest: 1 };
    return of(newScrum);
  }
}
