import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

    constructor(
        public authService: AuthenticationService,
        public router: Router
    ) { }

    ngOnInit() {
    }

    logout() {
        this.authService.Logout();
        this.router.navigate(['login']);
    }
}