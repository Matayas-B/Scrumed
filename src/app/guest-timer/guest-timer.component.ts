import { Component, OnInit, Input, Output } from '@angular/core';
import { interval } from 'rxjs';
import { Guest } from 'src/api/models/guest';
import { EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TimerService } from 'src/api/services/timer.service';
import { Socket } from 'ngx-socket-io';
import { Scrum } from 'src/api/models/scrum';

const secondsCounter = interval(1000);

@Component({
  selector: 'app-guest-timer',
  templateUrl: './guest-timer.component.html',
  styleUrls: ['./guest-timer.component.scss'],
  animations: [
    trigger('changeTitleSize', [
      state('initial', style({
        fontSize: '{{initialpixels}}px'
      }), { params: { initialpixels: 50 } }),
      state('final', style({
        fontSize: '{{finalpixels}}px'
      }), { params: { finalpixels: 75 } }),
      transition('initial => final', animate('100ms')),
      transition('final => initial', animate('400ms'))
    ])
  ]
})
export class GuestTimerComponent implements OnInit {

  currentState = 'initial';
  activeUserRemainingSeconds: number;

  wasStarted: boolean = false;
  isRunning: boolean = false;

  @Input() activeUser: Guest;

  @Input() currentScrum: Scrum;

  @Output() nextUser: EventEmitter<any> = new EventEmitter();

  constructor(
    private timerService: TimerService,
    private socket: Socket
  ) { }

  changeTitleSize() {
    this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
  }

  startScrum() {
    this.socket.emit('startScrum', {
      scrumId: this.currentScrum.id
    });
  }

  pauseOrResumeScrum() {
    this.timerService.getCurrentTurnTime();
  }

  sendCurrentTimeToServer(currentTime: string) {
    this.socket.emit('pauseScrum', {
      isPaused: !this.isRunning,
      minutes: currentTime.substr(0,2),
      seconds: currentTime.substr(2,2)
    });
  }

  changeScrumState(isRunning: boolean) {
    this.timerService.pauseOrResumeScrum(isRunning);
    this.isRunning = isRunning;
  }

  nextTurn() {
    this.nextUser.emit(null);
  }

  countdown() {
    if (this.isRunning) {
      --this.activeUserRemainingSeconds;
      if (this.activeUserRemainingSeconds === 0) {
        this.nextTurn();
        this.activeUserRemainingSeconds = this.currentScrum.minutesPerGuest * 60;
      }
    }
  }

  ngOnInit() {
    /* Sockets Events */
    this.socket.fromEvent('scrumStarted').subscribe(data => {
      this.wasStarted = true;
      this.changeScrumState(!this.isRunning);
    })
    this.socket.fromEvent('scrumPaused').subscribe(data => {
      this.changeScrumState(data['isPaused']);
      this.timerService.setCurrentTurnTime(data['minutes'], data['seconds']);
    })

    this.activeUserRemainingSeconds = this.currentScrum.minutesPerGuest * 60;
    secondsCounter.subscribe(() => this.countdown());
  }
}
