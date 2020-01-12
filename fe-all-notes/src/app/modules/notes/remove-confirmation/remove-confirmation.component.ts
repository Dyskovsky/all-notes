import { Component, OnInit, Inject } from '@angular/core';
import { MODAL_DATA } from '../../shared/modal/data/modal-data.injection-token';
import { NoteDto } from 'api';
import { ModalRef } from '../../shared/modal/models/modal-ref';

// TODO fix cannot use NoteDto
// WARNING in ../dist/api/notes/note.dto.js 3:24-31
// Critical dependency: require function is used in a way in which dependencies cannot be statically extracted

@Component({
  selector: 'dk-remove-confirmation',
  templateUrl: './remove-confirmation.component.html',
  styleUrls: ['./remove-confirmation.component.scss']
})
export class RemoveConfirmationComponent implements OnInit {
  public noteDto: NoteDto;

  constructor(public modalRef: ModalRef<RemoveConfirmationComponent, any>, @Inject(MODAL_DATA) noteDto: any) {
    this.noteDto = noteDto;
  }

  ngOnInit() {
    console.log('Ref: ', this.modalRef);
  }

  handleYes() {
    this.modalRef.close({
      result: 'yes',
    });
  }

  handleNo() {
    this.modalRef.close({
      result: 'no',
    });
  }

}
