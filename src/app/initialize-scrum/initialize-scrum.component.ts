import { Component, OnInit } from '@angular/core';
import { Guest } from 'src/api/models/guest';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GuestService } from 'src/api/services/guest.service';

@Component({
  selector: 'app-initialize-scrum',
  templateUrl: './initialize-scrum.component.html',
  styleUrls: ['./initialize-scrum.component.scss']
})
export class InitializeScrumComponent implements OnInit {

  participants: Guest[] = [];

  nextParticipantForm: FormGroup;

  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private guestService: GuestService
  ) { }

  // Getter to access form controls for validation
  //TODO: validate input on form ! ! !
  get form() { return this.nextParticipantForm.controls; }

  addParticipant() {
    this.submitted = true;

    if (this.nextParticipantForm.invalid)
    return;

    var newGuest = new Guest(
      this.form['participantName'].value
    );
    this.guestService.addGuest(newGuest).subscribe(guests => {
      this.participants = guests;
    })
  }

  ngOnInit() {
    this.nextParticipantForm = this.formBuilder.group({
      participantName: ['', Validators.required]
    });
    this.guestService.getGuests().subscribe(guests => this.participants = guests);
  }

}
