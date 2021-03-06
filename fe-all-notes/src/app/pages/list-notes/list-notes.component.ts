import { Component, OnInit } from '@angular/core';
import { NotesApiService } from '../../api/notes/notes-api.service';
import { NoteDto } from 'api';
import { ToastService } from '../../shared/toaster/toast.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'dk-list-notes',
  templateUrl: './list-notes.component.html',
  styleUrls: ['./list-notes.component.scss'],
})
export class ListNotesComponent implements OnInit {
  notes: NoteDto[];

  constructor(private notesApiService: NotesApiService, private toastService: ToastService) { }

  ngOnInit() {
    this.getNotes();
  }

  getNotes() {
    this.notesApiService.getAll().subscribe(notes => {
      this.notes = notes;
    });
  }

  delete(noteDto: NoteDto) {
    this.notesApiService.delete(noteDto.id.toString()).subscribe(() => {
      this.getNotes();
      this.toastService.success({ title: 'The note removed', body: `Access to the note titled "${noteDto.title}" is no longer possible` });
    }, (error: HttpErrorResponse) => {
      this.toastService.error({ title: `${error.status} ${error.name}`, body: error.message });
    });
  }
}
