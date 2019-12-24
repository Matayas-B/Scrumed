import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ArchwizardModule } from 'angular-archwizard';
import { ToastrModule } from 'ngx-toastr';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GuestTimerComponent } from './guest-timer/guest-timer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ScrumTimerComponent } from './scrum-timer/scrum-timer.component';
import { ScrumFinishedComponent } from './scrum-finished/scrum-finished.component';
import { TimerComponent } from './timer/timer.component';
import { HttpClientModule } from '@angular/common/http';
import { InitializeScrumComponent } from './initialize-scrum/initialize-scrum.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { HomeComponent } from './home/home.component';
import {JoinScrumModalDialog} from './home/join-scrum-modal/join-scrum-modal'
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material';

const config: SocketIoConfig = { url: environment.serviceBaseUrl, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    GuestTimerComponent,
    PageNotFoundComponent,
    ScrumTimerComponent,
    ScrumFinishedComponent,
    TimerComponent,
    InitializeScrumComponent,
    HomeComponent,
    JoinScrumModalDialog
  ],
  entryComponents: [
    JoinScrumModalDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    ArchwizardModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
