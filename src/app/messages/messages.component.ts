import { Component, OnInit } from '@angular/core';
import { MessagesService } from './messages.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {

    public showMessages = false;
    public errors$: Observable<string[]>;

    constructor(
        public messagesService: MessagesService,
    ) {

    }

    public ngOnInit(): void {
        this.errors$ = this.messagesService.errors$.pipe(
            tap(() => this.showMessages = true),
        );
    }

    public onClose(): void {
        this.showMessages = false;
    }
}
