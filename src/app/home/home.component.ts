import { Component, OnInit } from '@angular/core';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoadingService } from '../loading/loading.service';
import { MessagesService } from '../messages/messages.service';
import { CoursesStore } from '../services/courses.store';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

    beginnerCourses$: Observable<Course[]>;
    intermedCourses$: Observable<Course[]>;
    advancedCourses$: Observable<Course[]>;

    constructor (
        private coursesStore: CoursesStore,
    ) {

    }

    public ngOnInit() {
        this.loadData();
    }

    public onCourseChange(course: Course) {
        this.loadData();
    }

    private loadData() {
        this.beginnerCourses$ = this.coursesStore.filterByCategory('BEGINNER');
        this.intermedCourses$ = this.coursesStore.filterByCategory('INTERMEDIATE');
        this.advancedCourses$ = this.coursesStore.filterByCategory('ADVANCED');
    }
}
