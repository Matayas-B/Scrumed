import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ScrumTimerComponent } from './scrum-timer/scrum-timer.component';
import { ScrumFinishedComponent } from './scrum-finished/scrum-finished.component';
import { InitializeScrumComponent } from './initialize-scrum/initialize-scrum.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    data: {title: 'Welcome to Scrummed!'}
  },
  {
    path: 'scrum-initialize',
    component: InitializeScrumComponent,
    data: {title: 'Initialize Scrum Meeting!'}
  },
  {
    path: 'scrum-timer/:id',
    component: ScrumTimerComponent,
    data: { title: 'Scrum Timer!' }
  },
  {
    path: 'scrum-finished',
    component: ScrumFinishedComponent,
    data: { title: 'Scrum Finished!' }
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
