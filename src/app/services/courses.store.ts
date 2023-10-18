import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from '../loading/loading.service';
import { MessagesService } from '../messages/messages.service';
import { ICoursesResponse } from './courses.service';

// Only one instance of the service available throughout the whole application
@Injectable({
    providedIn: 'root'
})
export class CoursesStore {

    private subject = new BehaviorSubject<Course[]>([]);

    public courses$: Observable<Course[]> = this.subject.asObservable();

    constructor(
        private http: HttpClient,
        private loadingService: LoadingService,
        private messagesService: MessagesService,
    ) {
        this.loadAllCourses();
    }

    public filterByCategory(category: string): Observable<Course[]> {
        return this.courses$.pipe(
            map((courses) => courses
                .filter(course => course.category === category)
                .sort(sortCoursesBySeqNo)
            ),
        );
    }

    public saveCourse(courseId: string, changes: Partial<Course>): Observable<Course> {

        const courses = this.subject.getValue();
        const index = courses.findIndex(course => course.id === courseId);
        const newCourse: Course = {
            ...courses[index],
            ...changes,
        }
        const newCourses: Course[] = courses.slice(0);
        newCourses[index] = newCourse;
        this.subject.next(newCourses);

        return this.http.put<Course>(`/api/courses/${courseId}`, changes)
                .pipe(
                    shareReplay(),
                    catchError((err: any): Observable<any> => {
                        const message = 'Could not save course';
                        this.messagesService.showErrors(message);
                        return throwError(err);
                    })
                );
    }

    private loadAllCourses(): void {
        const loadCourses$: Observable<Course[]> = this.http.get<ICoursesResponse>('/api/courses').pipe(
            map((response: ICoursesResponse) => response.payload),
            catchError(err => {
                const message = 'Could not load courses';
                this.messagesService.showErrors(message);
                return throwError(err);
            }),
            tap(courses => this.subject.next(courses)),
        );
        this.loadingService.showLoaderUntilCompleted(loadCourses$).subscribe();
    }
}
