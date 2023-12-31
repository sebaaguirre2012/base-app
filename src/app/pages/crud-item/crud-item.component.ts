import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Item } from 'src/app/shared/item';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
    selector: 'app-crud-item',
    templateUrl: './crud-item.component.html',
    styleUrls: ['./crud-item.component.scss'],
})
export class CrudItemComponent implements OnInit {

    item: Item;
    items: Item[] = [];
    file: any;
    enable: Boolean = false;
    loading: any;
    toast: any;

    constructor(private database: FirestoreService,
        private storage: StorageService,
        private loadingCtrl: LoadingController,
        private toastController: ToastController,
        private alertController: AlertController,
        public photoService: PhotoService
    ) { }

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
    }

    async addItem() {
        this.showLoading('Adding Item...');
        // const res = await this.storage.uploadImage(this.file, 'items/', this.item.id);
        const res = await this.photoService.uploadImageFromBase64(this.item.photo, 'items/', this.item.id);
        this.item.photo = res;
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

    async uploadImageFromFS(event: any) {
        if (event.target.files && event.target.files[0]) {
            this.file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (img => {
                this.item.photo = img.target.result as string;
            });
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    async showLoading(message: string) {
        this.loading = await this.loadingCtrl.create({ message });
        this.loading.present();
    }

    async presentToast(message: string) {
        this.toast = await this.toastController.create({ message, duration: 3000 });
        await this.toast.present();
    }

    async addPhotoToGallery() {
        this.item.photo = await this.photoService.takePhoto();
        console.log(this.item.photo);
    }


}
