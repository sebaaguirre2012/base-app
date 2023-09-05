import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrudItemPageRoutingModule } from './crud-item-routing.module';

import { CrudItemPage } from './crud-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrudItemPageRoutingModule
  ],
  declarations: [CrudItemPage]
})
export class CrudItemPageModule {}
