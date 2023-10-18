import { AfterViewInit, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Course } from '../model/course';
import { LoadingService } from '../loading/loading.service';
import { MessagesService } from '../messages/messages.service';
import { CoursesStore } from '../services/courses.store';

import * as moment from 'moment';

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css'],
    providers: [LoadingService, MessagesService],
})
export class CourseDialogComponent implements AfterViewInit {

    public form: FormGroup;
    public course: Course;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        private coursesStore: CoursesStore,
        @Inject(MAT_DIALOG_DATA) course: Course,
    ) {
        this.course = course;
        this.form = this.fb.group({
            description: [course.description, Validators.required],
            category: [course.category, Validators.required],
            releasedAt: [moment(), Validators.required],
            longDescription: [course.longDescription, Validators.required],
        });
    }

    public ngAfterViewInit(): void {

    }

    public save(): void {
        const changes = this.form.value;
        this.coursesStore.saveCourse(this.course.id, changes).subscribe();
        this.dialogRef.close(changes);
    }

    public close(): void {
        this.dialogRef.close();
    }
}
