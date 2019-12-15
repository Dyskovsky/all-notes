import { Component, OnInit } from '@angular/core';
import { NotesService } from '../notes/notes.service';
import { NoteDto } from 'api';
import { ToastService } from '../../shared/toast/toast.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'dk-list-notes',
  templateUrl: './list-notes.component.html',
  styleUrls: ['./list-notes.component.scss'],
})
export class ListNotesComponent implements OnInit {
  notes: NoteDto[];

  constructor(private notesService: NotesService, private toastService: ToastService) {}

  ngOnInit() {
    this.getNotes();
  }

  getNotes() {
    this.notesService.getAll().subscribe(notes => {
      this.notes = notes;
    });
  }

  delete(noteDto: NoteDto) {
    this.notesService.delete(noteDto.id.toString()).subscribe(() => {
      this.getNotes();
      this.toastService.success({ title: 'The note removed', body: `Access to the note titled "${noteDto.title}" is no longer possible`});
    }, (error: HttpErrorResponse) => {
      this.toastService.error({ title: `${error.status} ${error.name}`, body: error.message});
    });
  }
}
