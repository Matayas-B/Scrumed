import { Component, OnInit, Input } from '@angular/core';
import { interval } from 'rxjs';
import { TimerService } from 'src/api/services/timer.service';

const secondsCounter = interval(1000);

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  @Input() totalTime: Date;

  @Input() timeBurst: number;

  @Input() isCountdown: boolean = false;

  minutes: string;
  seconds: string;
  remainingTime: number;

  isRunning: boolean = false;

  constructor(
    private timerService: TimerService
  ) { }

  rebootTimer() {
    this.minutes = this.timeBurst > 9 ? this.timeBurst.toString() : '0' + this.timeBurst.toString();
    this.seconds = '00';
    this.remainingTime = this.timeBurst * 60;
  }

  decreaseTime() {
    var newSeconds = +this.seconds === 0 ? +this.seconds : +this.seconds - 1;
    var newMinutes = +this.minutes;

    if (newSeconds === 0) {
      newSeconds = 59;
      newMinutes = +this.minutes - 1;
    }

    (newMinutes !== undefined && newMinutes < 10) ? (this.minutes = "0" + String(newMinutes)) : (this.minutes = String(newMinutes));
    (newSeconds != undefined && newSeconds < 10) ? (this.seconds = "0" + String(newSeconds)) : (this.seconds = String(newSeconds));
  }

  decreaseTimer() {
    if (this.isRunning) {
      --this.remainingTime;
      if (this.remainingTime === 0) {
        this.rebootTimer();
      }
      else {
        this.decreaseTime();
      }
    }
  }

  ngOnInit() {
    this.timerService.pauseAndResumeSubject.subscribe(newState => this.isRunning = newState);
    if (this.isCountdown) {
      this.rebootTimer();
      secondsCounter.subscribe(() => this.decreaseTimer());
    }
    else {
      //TODO: Match totalMinutes from Scrum JSON
      this.minutes = this.totalTime.getMinutes() > 10 ? this.totalTime.getMinutes().toString() : '0' + this.totalTime.getMinutes().toString();
      this.seconds = '00';
      secondsCounter.subscribe(() => this.decreaseTime());
    }
  }
}
