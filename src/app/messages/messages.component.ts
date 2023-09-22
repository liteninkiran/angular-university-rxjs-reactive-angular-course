import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageService } from './messages.service';

@Component({
    selector: 'messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {

    public showMessages = false;
    public errors$: Observable<string[]>;
  
    constructor(public messageService: MessageService) {

    }

    public ngOnInit(): void {

    }

    public onClose(): void {
        this.showMessages = false;
    }
}
