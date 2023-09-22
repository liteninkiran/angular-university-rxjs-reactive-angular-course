import { Component, OnInit } from '@angular/core';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoadingService } from '../loading/loading.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

    public beginnerCourses$: Observable<Course[]>;
    public advancedCourses$: Observable<Course[]>;

    constructor(
        private coursesService: CoursesService,
        private loadingService: LoadingService,
    ) {

    }

    public ngOnInit(): void {
        this.reloadCourses();
    }

    public reloadCourses(): void {
        const courses$: Observable<Course[]> = this.coursesService.loadAllCourses().pipe(
            map((courses: Course[]) => courses.sort(sortCoursesBySeqNo)),
        );
        const loadCourses$: Observable<Course[]> = this.loadingService.showLoaderUntilCompleted(courses$);
        this.defineObservable(loadCourses$, 'BEGINNER', 'beginnerCourses$');
        this.defineObservable(loadCourses$, 'ADVANCED', 'advancedCourses$');
    }

    private defineObservable(loadCourses$: Observable<Course[]>, category: string, varName: string): void {
        this[varName] = loadCourses$.pipe(
            map((courses: Course[]) => courses.filter((course: Course) => course.category === category))
        );
    }
}
