import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { MongoRepository } from 'typeorm';
import { CreateNoteDto, NoteDto, UpdateNoteDto } from './classes';
import { noteToNoteDto } from './utils/note-to-note-dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: MongoRepository<Note>,
  ) { }

  async create(createNoteDto: CreateNoteDto, creator: string): Promise<NoteDto> {
    const createNote = { ...createNoteDto, creator };
    const note = this.noteRepository.create(createNote);
    const noteEntity = await this.noteRepository.save(note);
    return noteToNoteDto(noteEntity);
  }

  async findAll(creator: string): Promise<NoteDto[]> {
    const noteEnities = await this.noteRepository.find({ creator });
    return noteEnities.map(noteToNoteDto);
  }

  async findOne(id: number, creator: string): Promise<NoteDto> {
    const noteEntity = await this.noteRepository.findOne(id);
    if (!noteEntity || noteEntity.creator !== creator) {
      return null;
    }
    return noteToNoteDto(noteEntity);
  }

  async update(id: number, updateNote: UpdateNoteDto, creator: string): Promise<NoteDto> {
    const noteEntity = await this.noteRepository.findOne(id);
    if (!noteEntity || noteEntity.creator !== creator) {
      return null;
    }
    this.noteRepository.merge(noteEntity, updateNote);
    const savedNoteEntity = await this.noteRepository.save(noteEntity);
    return noteToNoteDto(savedNoteEntity);
  }

  async remove(id: number, creator: string): Promise<NoteDto> {
    const noteEntity = await this.noteRepository.findOne(id);
    if (!noteEntity || noteEntity.creator !== creator) {
      return null;
    }
    const removedNodeEnity = await this.noteRepository.remove(noteEntity);
    return noteToNoteDto(removedNodeEnity);
  }
}
