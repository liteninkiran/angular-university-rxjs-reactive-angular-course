import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Course} from '../model/course';
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
        return this.http.get<Course[]>('/api/courses').pipe(
            map((res) => res['payload'])
        );
    }
}