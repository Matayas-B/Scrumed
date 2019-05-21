import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  constructor() { }

  getCurrentTime(): Observable<Date> {
    return of(new Date());
  }
}
