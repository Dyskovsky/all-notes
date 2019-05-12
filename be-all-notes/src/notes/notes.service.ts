import { Injectable } from '@nestjs/common';
import { Note } from './interfaces/note.interface';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdatedNoteDto } from './dto/update-note.dto';

let uniqueId = 0;

@Injectable()
export class NotesService {
  private readonly notes = [{
    id: (++uniqueId).toString(),
    title: 'First note',
    body: 'This is note body',
    type: 'text' as 'text',
  }, {
    id: (++uniqueId).toString(),
    title: 'Another note',
    body: 'Some text',
    type: 'text' as 'text',
  },
  ];

  create(createNote: CreateNoteDto): Note {
    const note = Object.assign(createNote, { id: (++uniqueId).toString() })
    this.notes.push(note);
    return note;
  }

  findAll(): Note[] {
    return this.notes;
  }

  findOne(id: string): Note {
    const note = this.notes.find(note => note.id === id);
    if (note) {
      return note;
    }
  }

  update(id, updateNote: UpdatedNoteDto): Note {
    const note = this.notes.find(n => n.id === id);
    if (note) {
      return Object.assign(note, updateNote);
    }
  }

  remove(id: string): boolean {
    const noteIndex = this.notes.findIndex(note => note.id === id);
    if (noteIndex !== -1) {
      this.notes.splice(noteIndex, 1);
      return true;
    }
    return false;
  }
}
