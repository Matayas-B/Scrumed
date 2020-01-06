import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ScrumData } from 'src/app/home/join-scrum-modal/join-scrum-modal';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-new-scrum-modal',
    templateUrl: './new-scrum-modal.html',
    styleUrls: ['./new-scrum-modal.scss']
})
export class NewScrumModalDialog {

    constructor(
        private toastr: ToastrService,
        public dialogRef: MatDialogRef<NewScrumModalDialog>,
        @Inject(MAT_DIALOG_DATA) public data: ScrumData
    ) { }

    toastInfo(infoMessage: string, position: string) {
      this.toastr.info(infoMessage, null, {
        positionClass: position,
        timeOut: 1000
      });
    }

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
        this.toastInfo("Scrum GUID copied!", "toast-bottom-center");
    }
}
