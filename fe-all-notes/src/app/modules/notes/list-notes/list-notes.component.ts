import { Component, OnInit } from '@angular/core';
import { NotesService } from '../notes/notes.service';
import { NoteDto } from 'api';

@Component({
  selector: 'dk-list-notes',
  templateUrl: './list-notes.component.html',
  styleUrls: ['./list-notes.component.scss'],
})
export class ListNotesComponent implements OnInit {
  notes: NoteDto[];

  constructor(private notesService: NotesService) {}

  ngOnInit() {
    this.getNotes();
  }

  getNotes() {
    this.notesService.getAll().subscribe(notes => {
      this.notes = notes;
    });
  }

  delete(id: string) {
    this.notesService.delete(id).subscribe(() => {
      this.getNotes();
    });
  }
}
