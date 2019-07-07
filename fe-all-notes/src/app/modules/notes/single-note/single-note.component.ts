import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotesService } from '../notes/notes.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UpdateNoteDto, CreateNoteDto } from 'api';

@Component({
  selector: 'dk-single-note',
  templateUrl: './single-note.component.html',
  styleUrls: ['./single-note.component.scss'],
})
export class SingleNoteComponent implements OnInit {
  noteForm: FormGroup;
  noteId: string;

  constructor(
    private notesService: NotesService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.noteForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: '',
    });

    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          if (params.has('id')) {
            this.noteId = params.get('id');
            return this.notesService.getOne(this.noteId);
          } else {
            return of({
              title: '',
              body: '',
            });
          }
        }),
      )
      .subscribe(note => {
        this.noteForm.get('title').setValue(note.title);
        this.noteForm.get('body').setValue(note.body);
      });
  }

  save() {
    const { title, body } = this.noteForm.getRawValue();
    if (this.noteId) {
      const updateNoteDto: UpdateNoteDto = {
        title,
        body,
      };
      this.notesService.update(this.noteId, updateNoteDto).subscribe();
    } else {
      const createNoteDto: CreateNoteDto = {
        title,
        body,
        type: 'text',
      };
      this.notesService.create(createNoteDto).subscribe(createdNote => {
        this.noteId = createdNote.id.toString();
      });
    }
  }
}
