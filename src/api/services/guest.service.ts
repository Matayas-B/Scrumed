import { Injectable } from '@angular/core';
import { Guest } from '../models/guest';
import { of, Observable } from 'rxjs';

export const GUESTS: Guest[] = [
  { name: "Matayas", turn: 1, isActive: true },
  { name: "Fede", turn: 2, isActive: false },
  { name: "Lucas", turn: 3, isActive: false },
  { name: "Lucho", turn: 4, isActive: false }
];

@Injectable({
  providedIn: 'root',
})
export class GuestService {
  constructor() { }

  getGuests(): Observable<Guest[]> {
    return of(GUESTS);
  }
}
