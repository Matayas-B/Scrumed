export class Guest {
  participantName: string;
  participantTurn: number;
  isActiveParticipant: boolean;

  constructor(name) {
    this.participantName = name,
    this.participantTurn = 0,
    this.isActiveParticipant = true
  }
}
