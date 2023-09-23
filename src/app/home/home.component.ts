import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { Observable } from 'rxjs';
import { CoursesStore } from '../services/courses.store';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

    public beginnerCourses$: Observable<Course[]>;
    public advancedCourses$: Observable<Course[]>;

    constructor(
        private coursesStore: CoursesStore,
    ) {

    }

    public ngOnInit(): void {
        this.reloadCourses();
    }

    public reloadCourses(): void {
        this.coursesStore.filterByCategory('BEGINNER');
        this.coursesStore.filterByCategory('ADVANCED');
    }
}
