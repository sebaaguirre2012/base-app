import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { CrudItemComponent } from './crud-item/crud-item.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
	declarations: [
		LoginComponent,
		DashboardComponent,
		CrudItemComponent,
		RegisterComponent
	],
	imports: [
		CommonModule,
		IonicModule,
		RouterModule,
		FormsModule
	]
})
export class PagesModule { }
