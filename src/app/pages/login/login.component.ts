import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ModalController } from '@ionic/angular';
import { ErrorMessageComponent } from '../error-message/error-message.component';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    loading: any;
    toast: any;
    public loginForm: FormGroup;

    public actionSheetButtons = [
        {
            text: 'Admin',
            handler: () => this.loginForm.setValue({
                email: 'admin@admin.com',
                password: '111111'
            })
        },
        {
            text: 'Invitado',
            handler: () => this.loginForm.setValue({
                email: 'invitado@invitado.com',
                password: '222222'
            })
        },
        {
            text: 'Usuario',
            handler: () => this.loginForm.setValue({
                email: 'usuario@usuario.com',
                password: '333333'
            })
        },
        {
            text: 'Anónimo',
            handler: () => this.loginForm.setValue({
                email: 'anonimo@anonimo.com',
                password: '444444'
            })
        },
        {
            text: 'Tester',
            handler: () => this.loginForm.setValue({
                email: 'tester@tester.com',
                password: '555555'
            })
        }
    ];

    constructor(
        public authService: AuthService,
        public router: Router,
        private loadingCtrl: LoadingController,
        private toastController: ToastController,
        public fb: FormBuilder,
        private modalController: ModalController
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
        this.showLoading('Iniciando sesión...');
        const user = await this.authService.login(email, password);
        if (user) {
            this.loading.dismiss();
            this.redirectUser();
        } else {
            this.loading.dismiss();
            this.presentErrorModal('Verifique los datos ingresados e intente nuevamente.');
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

    async presentErrorModal(errorMessage: string) {
        const modal = await this.modalController.create({
            component: ErrorMessageComponent,
            componentProps: {
                errorMessage: errorMessage
            }
        });
        return await modal.present();
    }
}
