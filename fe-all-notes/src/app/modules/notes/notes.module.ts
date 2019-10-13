import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListNotesComponent } from './list-notes/list-notes.component';
import { SingleNoteComponent } from './single-note/single-note.component';
import { NotesRoutingModule } from './notes-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ListNotesComponent, SingleNoteComponent],
  imports: [
    CommonModule,
    SharedModule,
    NotesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class NotesModule { }
