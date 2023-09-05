import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CrudItemComponent } from './pages/crud-item/crud-item.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'crud-item', component: CrudItemComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'password-reset', component: PasswordResetComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: '', component: LoginComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
