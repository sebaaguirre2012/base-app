import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    loading: any;
    toast: any;

    constructor(
        public authService: AuthService,
        public router: Router,
        private loadingCtrl: LoadingController,
        private toastController: ToastController,
    ) { }

    ngOnInit() { }

    async onLogin(email, password) {
        const user = await this.authService.login(email.value, password.value);
        if (user) {
            this.redirectUser();
        }
    }

    async onLoginGoogle() {
        const user = await this.authService.loginGoogle();
        if (user) {
            this.redirectUser();
        }
    }

    async onRegister(email, password) {
        const user = await this.authService.register(email.value, password.value);
        if (user) {
            this.redirectUser();
        }
    }

    redirectUser() {
        this.router.navigate(['dashboard']);
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
