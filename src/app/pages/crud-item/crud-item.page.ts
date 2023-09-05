import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Item } from 'src/app/shared/item';

@Component({
    selector: 'app-add-item',
    templateUrl: './crud-item.page.html',
    styleUrls: ['./crud-item.page.scss'],
})
export class CrudItemPage implements OnInit {

    item: Item;
    items: Item[] = [];
    enable: Boolean = false;

    constructor(private database: FirestoreService) { }

    ngOnInit() {
        this.getItems();
    }

    addItem() {
        this.database.createDoc(this.item, 'items/', this.item.id)
            .then(res => {
     
            }).catch(error => {
                console.log('Error ->', error);
            });
    }

    uploadImage(event: any) {
        console.log(event);
    }

    openCamera() {
        console.log('Camara');
    }

    getItems() {
        this.database.getCollection<Item>('items/').subscribe(res => {
            console.log(res);
            this.items = res;
        });
    }

    deleteItem(item: Item) {
        this.database.deleteDoc('items/', item.id);
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
}
