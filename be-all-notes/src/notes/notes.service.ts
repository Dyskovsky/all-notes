import { Injectable } from '@nestjs/common';
import { CreateNoteDto, UpdateNoteDto } from 'api';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { MongoRepository } from 'typeorm';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: MongoRepository<Note>,
  ) {}

  async create(createNote: CreateNoteDto): Promise<Note> {
    const note = this.noteRepository.create(createNote);
    return await this.noteRepository.save(note);
  }

  async findAll(): Promise<Note[]> {
    return await this.noteRepository.find();
  }

  async findOne(id: string): Promise<Note> {
    return await this.noteRepository.findOne(id);
  }

  async update(id: string, updateNote: UpdateNoteDto): Promise<Note> {
    const note = await this.noteRepository.findOne(id);
    this.noteRepository.merge(note, updateNote);
    return await this.noteRepository.save(note);
  }

  async remove(id: string): Promise<Note> {
    const note = await this.noteRepository.findOne(id);
    if (note) {
      return await this.noteRepository.remove(note);
    } else {
      return Promise.resolve(null);
    }
  }
}
