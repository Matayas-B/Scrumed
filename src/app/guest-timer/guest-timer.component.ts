import { Component, OnInit, Input, Output } from '@angular/core';
import { interval } from 'rxjs';
import { Guest } from 'src/api/models/guest';
import { EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TimerService } from 'src/api/services/timer.service';

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

  @Input() minutesPerTurn: number;

  @Output() nextUser: EventEmitter<any> = new EventEmitter();

  constructor(
    private timerService: TimerService
  ) { }

  changeTitleSize() {
    this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
  }

  pauseScrum() {
    this.wasStarted = true;

    this.timerService.pauseOrResumeScrum(!this.isRunning);
    this.isRunning = !this.isRunning;
  }

  nextTurn() {
    this.nextUser.emit(null);
  }

  countdown() {
    if (this.isRunning) {
      --this.activeUserRemainingSeconds;
      if (this.activeUserRemainingSeconds === 0) {
        this.nextTurn();
        this.activeUserRemainingSeconds = this.minutesPerTurn * 60;
      }
    }
  }

  ngOnInit() {
    this.activeUserRemainingSeconds = this.minutesPerTurn * 60;
    secondsCounter.subscribe(() => this.countdown());
  }
}
