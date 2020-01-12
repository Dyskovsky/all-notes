import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListNotesComponent } from './list-notes/list-notes.component';
import { SingleNoteComponent } from './single-note/single-note.component';
import { NotesRoutingModule } from './notes-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RemoveConfirmationComponent } from './remove-confirmation/remove-confirmation.component';

@NgModule({
  declarations: [ListNotesComponent, SingleNoteComponent, RemoveConfirmationComponent],
  imports: [
    CommonModule,
    NotesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  entryComponents: [
    RemoveConfirmationComponent,
  ],
})
export class NotesModule { }
