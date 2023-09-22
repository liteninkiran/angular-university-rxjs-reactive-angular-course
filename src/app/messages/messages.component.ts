import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {

    public showMessages = false;
    public errors$: Observable<string[]>;
  
    constructor() {

    }

    public ngOnInit(): void {

    }

    public onClose(): void {
        this.showMessages = false;
    }
}
