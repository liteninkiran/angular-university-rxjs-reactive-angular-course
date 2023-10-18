import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { concatMap, finalize, tap } from "rxjs/operators";

// Multiple instances available (i.e. use providers)
@Injectable()
export class LoadingService {

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$: Observable<boolean> = this.loadingSubject.asObservable();

    constructor() {

    }

    public showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
        return of(null).pipe(
            tap(() => this.loadingOn()),
            concatMap(() => obs$),
            finalize(() => this.loadingOff()),
        );
    }

    private loadingOn(): void {
        this.loadingSubject.next(true);
    }

    private loadingOff(): void {
        this.loadingSubject.next(false);
    }
}
