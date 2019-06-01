import { Routes, RouterModule } from '@angular/router';
import { SingleNoteComponent } from './single-note/single-note.component';
import { ListNotesComponent } from './list-notes/list-notes.component';
import { NgModule } from '@angular/core';

const notesRoutes: Routes = [
  {
    path: 'create',
    component: SingleNoteComponent,
  },
  {
    path: 'edit/:id',
    component: SingleNoteComponent,
  },
  {
    path: '**',
    component: ListNotesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(notesRoutes)],
  exports: [RouterModule],
})
export class NotesRoutingModule {}
