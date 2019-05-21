import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { GuestService } from 'src/api/services/guest.service';
import { Guest } from 'src/api/models/guest';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss']
})
export class GuestComponent implements OnInit {

  @Input() activeUser: Guest;

  allGuests: Guest[] = [];
  guestList: Guest[] = [];

  constructor(
    private guestService: GuestService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    this.guestList = this.allGuests.filter(g => g !== this.activeUser);
  }

  ngOnInit() {
    this.guestService.getGuests().subscribe(guests => {
      this.allGuests = guests;
      this.guestList = this.allGuests.filter(g => g !== this.activeUser);
    });
  }

}
