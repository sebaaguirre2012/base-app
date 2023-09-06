import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Usuario } from 'src/app/shared/usuario';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { StorageService } from 'src/app/services/storage.service';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

    usuario: Usuario;
    usuarios: Usuario[] = [];
    clave: string;
    file: any;
    enable: Boolean = false;
    loading: any;
    toast: any;

    constructor(private auth: AuthenticationService,
        public router: Router,
        private database: FirestoreService,
        private storage: StorageService,
        private loadingCtrl: LoadingController,
        private toastController: ToastController,
        private alertController: AlertController) { }

    ngOnInit() { 
        this.usuario = {
            uid: '',
            nombres: '',
            apellidos: '',
            dni: null,
            correo: '',
            clave: '',
            foto: '',
        }
    }

    async registrar() {
        // Validar campos
        const res = await this.auth.Register(this.usuario.correo, this.usuario.clave);
        this.usuario.uid = await this.auth.GetUid();
        this.guardarUsuario();
    }

    async guardarUsuario() {
        this.showLoading('Registrando usuario...');
        const res = await this.storage.uploadImage(this.file, 'usuarios/', this.usuario.uid);
        this.usuario.foto = res;
        this.database.createDoc(this.usuario, 'usuarios/', this.usuario.uid)
        .then(res => {
            this.loading.dismiss();
            this.presentToast('Usuario registrado...');
        }).catch(error => {
            console.log('Error ->', error);
        });
    }

    async uploadImage(event: any) {
        if (event.target.files && event.target.files[0]) {
            this.file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (img => {
                this.usuario.foto = img.target.result as string;
            });
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    salir() {
        this.auth.Logout();
        this.router.navigate(['login']);
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
