import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ScrumData } from 'src/app/home/join-scrum-modal/join-scrum-modal';

@Component({
    selector: 'app-new-scrum-modal',
    templateUrl: './new-scrum-modal.html',
    styleUrls: ['./new-scrum-modal.scss']
})
export class NewScrumModalDialog {

    constructor(
        public dialogRef: MatDialogRef<NewScrumModalDialog>,
        @Inject(MAT_DIALOG_DATA) public data: ScrumData
    ) { }

    copyToClipboard(scrumId): void {
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = scrumId;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
    }
}