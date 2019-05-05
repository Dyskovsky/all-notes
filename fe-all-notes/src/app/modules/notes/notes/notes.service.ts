import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor() { }

  getNotes() {
    return of([
      {
        title: 'First note',
        body: 'This is note body',
      }, {
        title: 'Another note',
        body: 'Some text',
      },
    ]);
  }
}
