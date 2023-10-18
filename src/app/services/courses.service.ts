import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Course } from '../model/course';
import { Lesson } from '../model/lesson';

// Only one instance of the service available throughout the whole application
@Injectable({
    providedIn: 'root',
})
export class CoursesService {

    constructor(private http: HttpClient) {

    }

    public loadAllCourses(): Observable<Course[]> {
        return this.http
                .get<ICoursesResponse>('/api/courses')
                .pipe(map(res => res.payload), shareReplay());
    }

    public saveCourse(courseId: string, changes: Partial<Course>): Observable<Course> {
        return this.http
                .put<Course>(`/api/courses/${courseId}`, changes)
                .pipe(shareReplay());
    }

    public searchLessons(search: string): Observable<Lesson[]> {
        const url = '/api/lessons';
        const options = {
            params: {
                filter: search,
                pageSize: '100',
            },
        }
        return this.http.get<ILessonResponse>('/api/lessons', options).pipe(
            map(res => res.payload), shareReplay()
        );
    }

    public loadCourseById(courseId: number): Observable<Course> {
        return this.http
                .get<Course>(`/api/courses/${courseId}`)
                .pipe(shareReplay());
    }
}

export interface ICoursesResponse {
    payload: Course[];
}

export interface ILessonResponse {
    payload: Lesson[];
}
