import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'app-error-message',
    templateUrl: './error-message.component.html',
    styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent implements OnInit {
    errorMessage: string;
    constructor(private modalController: ModalController) { }

    ngOnInit() { }

    closeModal() {
        this.modalController.dismiss();
    }

}
