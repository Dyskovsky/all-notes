import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdatedNoteDto } from './dto/update-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { MongoRepository } from 'typeorm';

@Injectable()
export class NotesService {
  constructor(@InjectRepository(Note) private readonly noteRepository: MongoRepository<Note>) { }

  async create(createNote: CreateNoteDto): Promise<Note> {
    const note = this.noteRepository.create(createNote)
    return await this.noteRepository.save(note);
  }

  async findAll(): Promise<Note[]> {
    return await this.noteRepository.find();
  }

  async findOne(id: number): Promise<Note> {
    return await this.noteRepository.findOne(id);
  }

  async update(id: number, updateNote: UpdatedNoteDto): Promise<Note> {
    const note = await this.noteRepository.findOne(id);
    this.noteRepository.merge(note, updateNote);
    return await this.noteRepository.save(note);
  }

  async remove(id: number): Promise<Note> {
    const note = await this.noteRepository.findOne(id);
    if (note) {
      return await this.noteRepository.remove(note);
    } else {
      return Promise.resolve(null);
    }
  }
}
