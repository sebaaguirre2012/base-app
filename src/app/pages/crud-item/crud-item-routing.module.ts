import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrudItemPage } from './crud-item.page';

const routes: Routes = [
  {
    path: '',
    component: CrudItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrudItemPageRoutingModule {}
