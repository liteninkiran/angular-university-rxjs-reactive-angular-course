import { Component, OnInit } from '@angular/core';
import { AuthStore } from './services/auth.store';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

    constructor(
        private authStore: AuthStore,
    ) {

    }

    public ngOnInit(): void { }

    public logout(): void {
        this.authStore.logout();
    }
}
