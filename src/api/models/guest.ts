export class Guest {
  name: string;
  turn: number;
  isActive: boolean;

  constructor(name) {
    this.name = name,
    this.turn = 0,
    this.isActive = true
  }
}
