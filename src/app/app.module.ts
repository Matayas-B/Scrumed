import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GuestComponent } from './guest/guest.component';
import { GuestTimerComponent } from './guest-timer/guest-timer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ScrumTimerComponent } from './scrum-timer/scrum-timer.component';
import { ScrumFinishedComponent } from './scrum-finished/scrum-finished.component';
import { TimerComponent } from './timer/timer.component';
import { HttpClientModule } from '@angular/common/http';
import { InitializeScrumComponent } from './initialize-scrum/initialize-scrum.component';

@NgModule({
  declarations: [
    AppComponent,
    GuestComponent,
    GuestTimerComponent,
    PageNotFoundComponent,
    ScrumTimerComponent,
    ScrumFinishedComponent,
    TimerComponent,
    InitializeScrumComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
