import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../model/course';
import { Lesson } from '../model/lesson';
import { Observable, combineLatest } from 'rxjs';
import { CoursesService } from '../services/courses.service';
import { map, startWith, tap } from 'rxjs/operators';

@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
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
        const course$ = this.coursesService.loadCourseById(courseId).pipe(startWith(null));
        const lessons$ = this.coursesService.loadAllCourseLessons(courseId).pipe(startWith([]));
        this.data$ = combineLatest([course$, lessons$]).pipe(map(([course, lessons]) => ({ course, lessons })));
    }
}

interface ICourseData {
    course: Course;
    lessons: Lesson[];
}
