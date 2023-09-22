import { OnInit, AfterViewInit, Component, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoursesService } from '../services/courses.service';
import { LoadingService } from '../loading/loading.service';
import { MessageService } from '../messages/messages.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Course } from '../model/course';
import * as moment from 'moment';

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css'],
    providers: [
        LoadingService,
        MessageService,
    ],
})
export class CourseDialogComponent implements OnInit, AfterViewInit {

    public form: FormGroup;
    public course: Course;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        private coursesService: CoursesService,
        private loadingService: LoadingService,
        private messageService: MessageService,
        @Inject(MAT_DIALOG_DATA) course: Course,
    ) {
        this.course = course;
        this.form = fb.group({
            description: [course.description, Validators.required],
            category: [course.category, Validators.required],
            releasedAt: [moment(), Validators.required],
            longDescription: [course.longDescription, Validators.required]
        });
    }

    public ngOnInit(): void {

    }

    public ngAfterViewInit(): void {

    }

    public save(): void {
        const changes = this.form.value;
        const saveCourse$ = this.coursesService
            .saveCourse(this.course.id, changes)
            .pipe(
                catchError((err) => {
                    console.log(err);
                    const message = 'Could not save course';
                    this.messageService.showErrors(message);
                    return throwError(err)
                })
            );
        this.loadingService.showLoaderUntilCompleted(saveCourse$).subscribe((res) => {
            this.dialogRef.close(res);
        });
    }

    public close(): void {
        this.dialogRef.close();
    }
}
