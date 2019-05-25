import { Guest } from './guest';

export class Scrum {
  meetingTitle: string;
  totalTime: Date;
  minutesPerGuest: number;
  guests: Guest[];

  constructor(meetTitle: string, minPerGuest: number, guestList: Guest[]) {
    this.meetingTitle = meetTitle,
    this.totalTime = new Date(),
    this.minutesPerGuest = minPerGuest,
    this.guests = guestList
  }
}
