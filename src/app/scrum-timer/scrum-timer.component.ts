import { Component, OnInit, HostBinding } from '@angular/core';
import { Guest } from 'src/api/models/guest';
import { TimerService } from 'src/api/services/timer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Scrum } from 'src/api/models/scrum';

@Component({
  selector: 'app-scrum-timer',
  templateUrl: './scrum-timer.component.html',
  styleUrls: ['./scrum-timer.component.scss']
})
export class ScrumTimerComponent implements OnInit {

  guestList: Guest[] = [];
  activeGuest: Guest;
  currentScrum: Scrum;
  minutesPerGuest: number;

  wasStarted: boolean = false;
  isRunning: boolean = false;

  constructor(
    private timerService: TimerService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  pauseScrum() {
    this.wasStarted = true;

    this.timerService.pauseOrResumeScrum(!this.isRunning);
    this.isRunning = !this.isRunning;
  }

  enableNextUser() {
    var currentTurn = this.activeGuest.participantTurn + 1;
    this.activeGuest = this.guestList.find(g => g.participantTurn === currentTurn);
    if (this.activeGuest === undefined)
      this.router.navigate(['/scrum-finished']);
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      var scrumId = params.get('id');
      this.timerService.getScrum(scrumId).subscribe(scrum => {
        this.currentScrum = scrum;
        this.guestList = this.currentScrum.guests;
        this.minutesPerGuest = this.currentScrum.minutesPerGuest;
        this.activeGuest = this.guestList.find(g => g.isActiveParticipant);
      })
    })
  }
}
