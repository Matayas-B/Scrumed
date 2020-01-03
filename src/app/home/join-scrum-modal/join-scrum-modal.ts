import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface ScrumData {
    scrumId: string;
}

@Component({
    selector: 'app-join-scrum-modal',
    templateUrl: './join-scrum-modal.html'
})
export class JoinScrumModalDialog {

    constructor(
        public dialogRef: MatDialogRef<JoinScrumModalDialog>,
        @Inject(MAT_DIALOG_DATA) public data: ScrumData
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }
}