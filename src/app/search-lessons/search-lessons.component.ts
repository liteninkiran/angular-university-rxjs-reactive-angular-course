import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Lesson } from '../model/lesson';
import { Observable } from 'rxjs';
import { CoursesService } from '../services/courses.service';

@Component({
    selector: 'course',
    templateUrl: './search-lessons.component.html',
    styleUrls: ['./search-lessons.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchLessonsComponent implements OnInit {

    public searchResults$: Observable<Lesson[]>;
    public activeLesson: Lesson;

    constructor(
        private coursesService: CoursesService,
    ) {

    }

    public ngOnInit(): void {

    }

    public onSearch(searchText: string): void {
        this.searchResults$ = this.coursesService.searchLessons(searchText);
    }

    public openLesson(lesson: Lesson) {
        this.activeLesson = lesson;
    }

    public onBackToSearch() {
        this.activeLesson = null;
    }
}
