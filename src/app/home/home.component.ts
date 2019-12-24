import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JoinScrumModalDialog } from './join-scrum-modal/join-scrum-modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  scrumId: string;

  constructor(
    private router: Router,
    public dialog: MatDialog
  ) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(JoinScrumModalDialog, { 
      width: '350px',
      data: { scrumId: this.scrumId }
    });

    dialogRef.afterClosed().subscribe(scrumId => {
      if (scrumId != undefined)
        this.router.navigate(['/scrum-timer/' + scrumId ]);
    });
  }
}
