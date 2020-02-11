import { Note } from '../note.entity';
import { NoteDto } from '../classes';

export function noteToNoteDto(noteEntinty: Note): NoteDto {
  const { creator, ...noteDto } = noteEntinty;
  return noteDto;
}
