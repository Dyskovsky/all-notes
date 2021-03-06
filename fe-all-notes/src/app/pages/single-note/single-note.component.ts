import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotesApiService } from '../../api/notes/notes-api.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UpdateNoteDto, CreateNoteDto } from 'api';
import { ToastService } from '../../shared/toaster/toast.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'dk-single-note',
  templateUrl: './single-note.component.html',
  styleUrls: ['./single-note.component.scss'],
})
export class SingleNoteComponent implements OnInit {
  noteForm: FormGroup;
  noteId: string;
  loaded = false;

  constructor(
    private notesApiService: NotesApiService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private router: Router,
  ) { }

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
            return this.notesApiService.getOne(this.noteId);
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
        this.loaded = true;
      });
  }

  save(): void {
    if (this.noteId) {
      this.updateNote(this.noteForm.getRawValue());
    } else {
      this.createNote(this.noteForm.getRawValue());
    }
  }


  delete(): void {
    this.notesApiService.delete(this.noteId).subscribe(() => {
      this.toastService.success({ title: 'The note removed', body: `Access to the note titled "${this.noteForm.get('title')}" is no longer possible` });
      this.router.navigate(['notes']);
    }, (error: HttpErrorResponse) => {
      this.toastService.error({ title: `${error.status} ${error.name}`, body: error.message });
    });
  }

  private updateNote({ title, body }): void {
    const updateNoteDto: UpdateNoteDto = {
      title,
      body,
    };
    this.notesApiService.update(this.noteId, updateNoteDto).subscribe(() => {
      this.toastService.success({ title: 'The note updated', body: `All changes have been saved!` });
    }, (error) => {
      this.toastService.error({ title: `${error.status} ${error.name}`, body: error.message });
    });
  }

  private createNote({ title, body }): void {
    const createNoteDto: CreateNoteDto = {
      title,
      body,
      type: 'text',
    };
    this.notesApiService.create(createNoteDto).subscribe(createdNote => {
      this.noteId = createdNote.id.toString();
      this.toastService.success({ title: 'New note created', body: `Everything is already saved and secure!` });
    }, (error) => {
      this.toastService.error({ title: `${error.status} ${error.name}`, body: error.message });
    });
  }
}
