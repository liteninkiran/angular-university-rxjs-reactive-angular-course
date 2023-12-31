import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { filter } from "rxjs/operators";

// Multiple instances available (i.e. use providers)
@Injectable()
export class MessagesService {

    private subject = new BehaviorSubject<string[]>([]);

    public errors$: Observable<string[]> = this.subject.asObservable().pipe(
        filter(messages => messages && messages.length > 0),
    );

    public showErrors(...errors: string[]): void {
        this.subject.next(errors);
    }
}
