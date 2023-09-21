import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Course, CourseResponse} from '../model/course';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {Lesson} from '../model/lesson';

@Injectable({
    providedIn:'root'
})
export class CoursesService {

    constructor(private http: HttpClient) {

    }

    public loadAllCourses(): Observable<Course[]> {
        return this.http.get<CourseResponse>('/api/courses').pipe(
            map((res: CourseResponse) => res.payload),
            shareReplay()
        );
    }
}
