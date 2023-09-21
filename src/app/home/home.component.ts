import { Component, OnInit } from '@angular/core';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { CoursesService } from '../services/courses.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
        private dialog: MatDialog,
    ) {

    }

    public ngOnInit(): void {
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

    public editCourse(course: Course): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '400px';
        dialogConfig.data = course;
        const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);
    }
}
