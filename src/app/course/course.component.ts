import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../model/course';
import { Lesson } from '../model/lesson';
import { Observable, combineLatest } from 'rxjs';
import { CoursesService } from '../services/courses.service';
import { map, tap } from 'rxjs/operators';

@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css'],
})
export class CourseComponent implements OnInit {

    public data$ : Observable<ICourseData>;

    constructor(
        private route: ActivatedRoute,
        private coursesService: CoursesService,
    ) {

    }

    public ngOnInit(): void {
        const courseId: number = parseInt(this.route.snapshot.paramMap.get('courseId'));
        const course$ = this.coursesService.loadCourseById(courseId);
        const lessons$ = this.coursesService.loadAllCourseLessons(courseId);
        this.data$ = combineLatest([course$, lessons$]).pipe(
            map(([course, lessons]) => ({ course, lessons })),
            tap(console.log),
        );
    }
}

interface ICourseData {
    course: Course;
    lessons: Lesson[];
}
