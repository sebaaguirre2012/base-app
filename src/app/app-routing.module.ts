import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CrudItemComponent } from './pages/crud-item/crud-item.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './shared/auth.guard';
import { ErrorMessageComponent } from './pages/error-message/error-message.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'crud-item', component: CrudItemComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'error-message', component: ErrorMessageComponent },
  { path: '', component: LoginComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
