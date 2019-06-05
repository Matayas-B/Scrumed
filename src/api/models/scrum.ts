import { Guest } from './guest';

export class Scrum {
  id: string;
  meetingTitle: string;
  totalTime: Date;
  minutesPerGuest: number;
  isCountdown: boolean;
  started: boolean;
  guests: Guest[];

  constructor(meetTitle: string, minPerGuest: number, countDown: boolean, guestList: Guest[]) {
    this.meetingTitle = meetTitle,
    this.totalTime = new Date(),
    this.minutesPerGuest = minPerGuest,
    this.isCountdown = countDown,
    this.guests = guestList
  }
}
