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
            map((courses: Course[]) => courses.sort(sortCoursesBySeqNo))
        );
        this.beginnerCourses$ = courses$.pipe(
            map((courses: Course[]) => courses.filter((course: Course) => course.category === 'BEGINNER'))
        );
        this.advancedCourses$ = courses$.pipe(
            map((courses: Course[]) => courses.filter((course: Course) => course.category === 'ADVANCED'))
        );
    }
}
