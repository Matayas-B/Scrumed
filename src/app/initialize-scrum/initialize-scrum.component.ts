import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { TimerService } from 'src/api/services/timer.service';
import { Scrum } from 'src/api/models/scrum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-initialize-scrum',
  templateUrl: './initialize-scrum.component.html',
  styleUrls: ['./initialize-scrum.component.scss']
})
export class InitializeScrumComponent implements OnInit {

  nextTurn = 1;

  scrumMeetingForm: FormGroup;
  participants: FormArray;
  nextParticipant: FormGroup;

  submitted = false;
  pSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private timerService: TimerService,
    private router: Router
  ) { }

  // Getter to access form controls for validation
  get form() { return this.scrumMeetingForm.controls; }
  get pForm() { return this.nextParticipant.controls; }

  addParticipant(name: string) {
    this.pSubmitted = true;
    if (this.nextParticipant.invalid)
      return;

    this.pForm['participantTurn'].setValue(this.nextTurn);
    this.pForm['isActiveParticipant'].setValue(this.nextTurn === 1);
    this.participants = this.scrumMeetingForm.get('participants') as FormArray;
    this.participants.push(new FormControl(this.nextParticipant.value));

    this.pForm['participantName'].setValue('');
    this.nextTurn++;
    this.pSubmitted = false;
  }

  createScrumMeeting() {
    this.submitted = true;

    if (this.scrumMeetingForm.invalid)
      return;

    var newScrum = new Scrum(
      this.scrumMeetingForm.get('meetingTitle').value,
      1,
      this.scrumMeetingForm.get('participants').value
    );
    this.timerService.createScrum(newScrum).subscribe(id => {
      this.router.navigate(['/scrum-timer/' + id])
    })
  }

  ngOnInit() {
    this.nextParticipant = this.formBuilder.group({
      participantName: ['', Validators.required],
      participantTurn: '',
      isActiveParticipant: ''
    });
    this.scrumMeetingForm = this.formBuilder.group({
      meetingTitle: ['', Validators.required],
      participants: this.formBuilder.array([], Validators.minLength(2))
    });
  }
}
