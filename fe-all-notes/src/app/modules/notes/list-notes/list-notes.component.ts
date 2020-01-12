import { Component, OnInit } from '@angular/core';
import { NotesService } from '../notes/notes.service';
import { NoteDto } from 'api';
import { ToastService } from '../../shared/toaster/toast.service';
import { ModalService } from '../../shared/modal/modal.service';
import { RemoveConfirmationComponent } from '../remove-confirmation/remove-confirmation.component';

@Component({
  selector: 'dk-list-notes',
  templateUrl: './list-notes.component.html',
  styleUrls: ['./list-notes.component.scss'],
})
export class ListNotesComponent implements OnInit {
  notes: NoteDto[];

  constructor(
    private notesService: NotesService,
    private toastService: ToastService,
    private modalService: ModalService) {}

  ngOnInit() {
    this.getNotes();
  }

  getNotes() {
    this.notesService.getAll().subscribe(notes => {
      this.notes = notes;
    });
  }

  delete(noteDto: NoteDto) {
    this.modalService.open(RemoveConfirmationComponent, noteDto).afterClosed().subscribe((result) => {
      console.log('result: ', result);
    });
    // this.notesService.delete(noteDto.id.toString()).subscribe(() => {
    //   this.getNotes();
    //   this.toastService.success({ title: 'The note removed', body: `Access to the note titled "${noteDto.title}" is no longer possible`});
    // }, (error: HttpErrorResponse) => {
    //   this.toastService.error({ title: `${error.status} ${error.name}`, body: error.message});
    // });
  }
}
