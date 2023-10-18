import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Course } from '../model/course';

// Only one instance of the service available throughout the whole application
@Injectable({
    providedIn: 'root',
})
export class CoursesService {

    constructor(private http: HttpClient) {

    }

    public loadAllCourses(): Observable<Course[]> {
        return this.http
                .get<IResponse>('/api/courses')
                .pipe(map(res => res.payload), shareReplay());
    }

    public saveCourse(courseId: string, changes: Partial<Course>): Observable<Course> {
        return this.http
                .put<Course>(`/api/courses/${courseId}`, changes)
                .pipe(shareReplay());
    }
}

export interface IResponse {
    payload: Course[];
}
