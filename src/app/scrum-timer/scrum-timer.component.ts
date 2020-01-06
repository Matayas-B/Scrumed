import { Component, OnInit, HostBinding } from '@angular/core';
import { Guest } from 'src/api/models/guest';
import { TimerService } from 'src/api/services/timer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Scrum } from 'src/api/models/scrum';
import { ToastrService } from 'ngx-toastr';

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

  isRunning: boolean = false;

  constructor(
    private timerService: TimerService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  enableNextUser() {
    this.timerService.moveToNextTurn(this.currentScrum.id);
  }

  toastError(errorMessage: string, errorTitle: string, position: string) {
    this.toastr.warning(errorMessage, errorTitle, {
      positionClass: position
    });
  }

  ngOnInit() {
    /* Sockets Events */
    this.timerService.changeActiveGuestTurn.subscribe(data => {
      if (data['isFinished'])
        this.router.navigate(['/scrum-finished']);

      this.activeGuest = data['nextGuest'];
      this.isRunning = data['isRunning'];
    })
    this.timerService.updateScrumState.subscribe(scrumData => {
      this.isRunning = scrumData['isPaused'];
    });

    this.route.paramMap.subscribe(params => {
      var scrumId = params.get('id');
      this.timerService.getScrum(scrumId).subscribe(
        scrum => {
          this.currentScrum = scrum;
          this.guestList = this.currentScrum.guests;
          this.minutesPerGuest = this.currentScrum.minutesPerGuest;
          this.activeGuest = this.guestList.find(g => g.isActiveParticipant);

          this.timerService.joinScrumRoom(scrumId);
          if (this.currentScrum.started)
            this.timerService.getCurrentScrumState(scrumId);
        },
        error => {
          this.toastError("Scrum meeting does not exists.", "Not Found", "toast-bottom-center");
          this.router.navigate(['/not-found']);
        })
    })
  }
}
