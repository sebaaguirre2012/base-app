import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

    constructor(
        public authService: AuthenticationService,
        public router: Router
    ) { }

    ngOnInit() { }

    logIn(email: any, password: any) {
        this.authService
            .SignIn(email.value, password.value)
            .then((): any => {

                this.router.navigate(['dashboard']);
                // if (this.authService.isEmailVerified) {
                // } else {
                //     window.alert('Email is not verified');
                //     return false;
                // }
            })
            .catch((error) => {
                window.alert(error.message);
            });
    }
}
