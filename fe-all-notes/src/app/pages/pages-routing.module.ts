import { Routes, RouterModule } from '@angular/router';
import { SingleNoteComponent } from './single-note/single-note.component';
import { ListNotesComponent } from './list-notes/list-notes.component';
import { NgModule } from '@angular/core';
import { PublicComponent } from './public/public.component';
import { LoggedGuard } from './logged.guard';
import { NotLoggedGuard } from './not-logged.guard';

const pagesRoutes: Routes = [
  {
    path: 'public',
    component: PublicComponent,
    canActivate: [NotLoggedGuard],
  },
  {
    path: 'notes',
    canActivate: [LoggedGuard],
    children: [
      {
        path: 'create',
        component: SingleNoteComponent,
      },
      {
        path: 'edit/:id',
        component: SingleNoteComponent,
      },
      {
        path: '',
        component: ListNotesComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'notes',
  },
];

@NgModule({
  imports: [RouterModule.forChild(pagesRoutes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
