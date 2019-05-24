import { Injectable } from '@angular/core';
import { Guest } from '../models/guest';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GuestService {

  baseUrl = environment.serviceBaseUrl;

  constructor(private httpClient: HttpClient) { }

  getGuests(): Observable<Guest[]> {
    const url = `${this.baseUrl}guests`;
    const headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.httpClient.get<Guest[]>(url, { headers });
  }

  addGuest(guest: Guest) {
    const url = `${this.baseUrl}guests/add-guest`;
    const headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.httpClient.post<Guest>(url, guest, { headers });
  }
}
