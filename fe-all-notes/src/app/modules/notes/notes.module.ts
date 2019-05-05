import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListNotesComponent } from './list-notes/list-notes.component';
import { NewNoteComponent } from './new-note/new-note.component';
import { SingleNoteComponent } from './single-note/single-note.component';

@NgModule({
  declarations: [ListNotesComponent, NewNoteComponent, SingleNoteComponent],
  imports: [
    CommonModule
  ],
  exports: [ ListNotesComponent ],
})
export class NotesModule { }
