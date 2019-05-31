import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { TimerService } from 'src/api/services/timer.service';
import { Scrum } from 'src/api/models/scrum';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    private router: Router,
    private toastr: ToastrService
  ) { }

  // Getter to access form controls for validation
  get form() { return this.scrumMeetingForm.controls; }
  get pForm() { return this.nextParticipant.controls; }

  toastError(errorMessage: string, errorTitle: string, position: string) {
    this.toastr.warning(errorMessage, errorTitle, {
      positionClass: position
    });
  }

  addParticipant() {
    this.pSubmitted = true;
    if (this.nextParticipant.invalid) {
      this.toastError("You should name your participant!!!", "Add participant", "toast-bottom-center");
      return;
    }

    this.pForm['participantTurn'].setValue(this.nextTurn);
    this.pForm['isActiveParticipant'].setValue(this.nextTurn === 1);
    this.participants = this.scrumMeetingForm.get('participants') as FormArray;
    this.participants.push(new FormControl(this.nextParticipant.value));

    this.pForm['participantName'].setValue('');
    this.nextTurn++;
    this.pSubmitted = false;
  }

  removeParticipant(index: number) {
    this.participants = this.scrumMeetingForm.get('participants') as FormArray;
    var participant = this.participants.value[index];

    this.participants.removeAt(index);
    this.participants.value.forEach((p, i) => {
      if (i >= index)
        --p.participantTurn;
    });
    if (this.participants.value.length > 0 && participant.isActiveParticipant) {
      this.participants.value[0].isActiveParticipant = true;
    }
    --this.nextTurn;
  }

  createScrumMeeting() {
    this.submitted = true;

    if (this.scrumMeetingForm.invalid) {
      if (this.form.meetingTitle.errors)
        this.toastError("You should name your metting!!!", "Name your meeting", "toast-bottom-right");
      if (this.form.minutesPerGuest.errors)
        this.toastError("Set the minutes for each round!!!", "Set minutes", "toast-bottom-right");
      if (this.form.participants.value.length < 3)
        this.toastError("You should have at least three participants!!!", "Scrum participants", "toast-bottom-right");
      return;
    }

    var newScrum = new Scrum(
      this.scrumMeetingForm.get('meetingTitle').value,
      this.scrumMeetingForm.get('minutesPerGuest').value,
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
      minutesPerGuest: [0, Validators.min(1)],
      participants: this.formBuilder.array([],[Validators.required, Validators.minLength(3)])
    });
  }
}
