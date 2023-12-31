import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './modules/material.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { CourseComponent } from './course/course.component';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';
import { HomeComponent } from './home/home.component';
import { LessonComponent } from './lesson/lesson.component';
import { LoadingComponent } from './loading/loading.component';
import { LoginComponent } from './login/login.component';
import { MessagesComponent } from './messages/messages.component';
import { SearchLessonsComponent } from './search-lessons/search-lessons.component';

import { SafeUrlPipe } from './common/safe-url.pipe';
import { CoursesCardListComponent } from './courses-card-list/courses-card-list.component';
import { LoadingService } from './loading/loading.service';
import { MessagesService } from './messages/messages.service';

@NgModule({
    declarations: [
        AboutComponent,
        AppComponent,
        CourseComponent,
        CourseDialogComponent,
        HomeComponent,
        LessonComponent,
        LoadingComponent,
        LoginComponent,
        MessagesComponent,
        SearchLessonsComponent,
        SafeUrlPipe,
        CoursesCardListComponent,
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MaterialModule,
        ReactiveFormsModule,
    ],
    providers: [
        LoadingService,
        MessagesService,
    ],
    bootstrap: [
        AppComponent,
    ],
})
export class AppModule {
}
