import { Injectable } from '@angular/core';
import { Course, CourseResponse, sortCoursesBySeqNo } from '../model/course';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from '../loading/loading.service';
import { MessageService } from '../messages/messages.service';

@Injectable({
    providedIn: 'root'
})
export class CoursesStore {

    private subject = new BehaviorSubject<Course[]>([]);

    public courses$: Observable<Course[]> = this.subject.asObservable();

    constructor(
        private http: HttpClient,
        private loading: LoadingService,
        private messages: MessageService,
    ) {
        this.loadAllCourses();
    }

    public filterByCategory(category: string): Observable<Course[]> {
        return this.courses$.pipe(map(courses => courses
            .filter(course => course.category === category)
            .sort(sortCoursesBySeqNo)
        ));
    }

    private loadAllCourses(): void {
        const errFunction = (err: any) => {
            const message = 'Could not load courses';
            this.messages.showErrors(message);
            console.log(message, err);
            return throwError(err);
        }
        const loadCourses$: Observable<Course[]> = this.http
            .get<CourseResponse>('/api/courses')
            .pipe(
                map((res: CourseResponse) => res.payload),
                catchError(err => errFunction(err)),
                tap(courses => this.subject.next(courses)),
            );

        this.loading
            .showLoaderUntilCompleted(loadCourses$)
            .subscribe();
    }
}
