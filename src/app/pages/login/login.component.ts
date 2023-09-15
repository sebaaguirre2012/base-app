import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    public loginForm: FormGroup;

    constructor(
        public authService: AuthService,
        public router: Router,
        private loadingCtrl: LoadingController,
        private toastController: ToastController,
        public fb: FormBuilder
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    ngOnInit() { }

    async onLogin() {
        if (this.loginForm.invalid) {
            return Object.values(this.loginForm.controls).forEach(control => {
                if (control instanceof FormGroup)
                    Object.values(control.controls).forEach(control => control.markAsTouched());
                else
                    control.markAsTouched();
            });
        }

        const { email, password } = this.loginForm.value;

        const user = await this.authService.login(email, password);
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

    get invalidEmail() {
        return this.loginForm.get('email').invalid && this.loginForm.get('email').touched;
    }

    get invalidPassword() {
        return this.loginForm.get('password').invalid && this.loginForm.get('password').touched;
    }
}
