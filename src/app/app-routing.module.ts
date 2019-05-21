import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ScrumTimerComponent } from './scrum-timer/scrum-timer.component';
import { ScrumFinishedComponent } from './scrum-finished/scrum-finished.component';

const routes: Routes = [
  {
    path: 'scrum-timer',
    component: ScrumTimerComponent,
    data: { title: 'Scrum Timer!' }
  },
  {
    path: 'scrum-finished',
    component: ScrumFinishedComponent,
    data: { title: 'Scrum Finished!' }
  },
  {
    path: '',
    redirectTo: '/scrum-timer',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
