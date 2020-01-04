import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleNoteModule } from './single-note/single-note.module';
import { ListNotesModule } from './list-notes/list-notes.module';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ListNotesModule,
    SingleNoteModule,
  ],
})
export class PagesModule { }
