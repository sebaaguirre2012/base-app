import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Item } from 'src/app/shared/item';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-add-item',
    templateUrl: './crud-item.page.html',
    styleUrls: ['./crud-item.page.scss'],
})
export class CrudItemPage implements OnInit {

    item: Item;
    items: Item[] = [];
    image: string;
    enable: Boolean = false;
    loading: any;
    toast: any;

    constructor(private database: FirestoreService,
        private loadingCtrl: LoadingController,
        private toastController: ToastController,
        private alertController: AlertController) { }

    ngOnInit() {
        this.getItems();
    }

    newItem() {
        this.enable = true;
        this.item = {
            name: '',
            description: '',
            id: this.database.getId(),
            date: new Date,
            photo: ''
        }
        this.image = '';
    }

    addItem() {
        this.showLoading('Adding Item...');
        this.database.createDoc(this.item, 'items/', this.item.id)
            .then(res => {
                this.loading.dismiss();
                this.presentToast('Item Added...');
            }).catch(error => {
                console.log('Error ->', error);
            });
    }

    getItems() {
        this.database.getCollection<Item>('items/').subscribe(res => {
            this.items = res;
        });
    }

    async deleteItem(item: Item) {
        const alert = await this.alertController.create({
            header: 'Delete',
            message: 'Are you sure?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel');;
                    },
                },
                {
                    text: 'OK',
                    role: 'confirm',
                    handler: () => {
                        this.showLoading('Removing Item...');
                        this.database.deleteDoc('items/', item.id)
                            .then(res => {
                                this.loading.dismiss();
                                this.presentToast('Item Deleted...');
                            }).catch(error => {
                                console.log('Error ->', error);
                            });
                    }
                }
            ]
        });

        await alert.present();
    }

    uploadImage(event: any) {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (img => {
                this.image = img.target.result as string;
            });
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    openCamera() {
        console.log('Camara');
    }

    async showLoading(message: string) {
        this.loading = await this.loadingCtrl.create({ message });
        this.loading.present();
    }

    async presentToast(message: string) {
        this.toast = await this.toastController.create({ message, duration: 3000 });
        await this.toast.present();
    }
}
