import { Controller, Get, Post, Put, Delete, Param, Body, Query, NotFoundException } from '@nestjs/common';
import { NoteDto } from './dto/note.dto';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdatedNoteDto as UpdateNoteDto } from './dto/update-note.dto';
import { ListAllEntities } from './dto/common';
import { NotesService } from './notes.service';

// TODO add logging middleware
// slug instead of id?
// swagger
// ListAllEntities <-- conver to number

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) { }

  @Get()
  getAll(@Query() query: ListAllEntities): NoteDto[] {
    console.log('Query is: ', query);
    return this.notesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id): NoteDto {
    const note = this.notesService.findOne(id);
    if (note) {
      return note;
    }
    throw new NotFoundException('Not Found', `id=${id}`);
  }

  @Post()
  create(@Body() createNote: CreateNoteDto): NoteDto {
    return this.notesService.create(createNote);
  }

  @Put(':id')
  update(@Param('id') id, @Body() updatedNote: UpdateNoteDto): NoteDto {
    const note = this.notesService.update(id, updatedNote);
    if (note) {
      return note;
    }
    throw new NotFoundException('Not Found', `id=${id}`);
  }

  @Delete(':id')
  remove(@Param('id') id): void {
    if (this.notesService.remove(id)) {
      return;
    }
    throw new NotFoundException('Not Found', `id=${id}`);
    // TODO check response code
  }
}
