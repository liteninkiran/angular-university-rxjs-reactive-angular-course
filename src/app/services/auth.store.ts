import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthStore {

    private subject: BehaviorSubject<User> = new BehaviorSubject<User>(null);

    public user$: Observable<User> = this.subject.asObservable();
    public isLoggedIn$: Observable<boolean>;
    public isLoggedOut$: Observable<boolean>;

    constructor(
        private http: HttpClient,
    ) {
        this.isLoggedIn$ = this.user$.pipe(map(user => !!user));
        this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));
    }

    public login(email: string, password: string): Observable<User> {
        const url = '/api/login';
        const body = { email, password }
        return this.http
            .post<User>(url, body)
            .pipe(
                tap(user => this.subject.next(user)),
                shareReplay(),
            );
    }

    public logout(): void {
        this.subject.next(null);

    }
}
