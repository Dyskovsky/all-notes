import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import {
  ApiUseTags,
  ApiResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiImplicitParam,
} from '@nestjs/swagger';
import { ListAllEntities } from 'api';
import { Note, CreateNote, UpdateNote } from './classes';
import { ErrorResponse } from '../models';
import { AuthGuard } from '@nestjs/passport';

// TODO add logging middleware
// ListAllEntities <-- conver to number
// TODO toast on remove/create/save note
// TODO sorting/ the new one shoudl be on top

@ApiUseTags('notes')
@Controller('notes')
@UseGuards(AuthGuard('jwt'))
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  @ApiOperation({ title: 'Get all notes' })
  @ApiOkResponse({ type: [Note] })
  getAll(@Query() query: ListAllEntities): Promise<Note[]> {
    return this.notesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ title: 'Get single note' })
  @ApiImplicitParam({ name: 'id' })
  @ApiOkResponse({ type: Note })
  @ApiNotFoundResponse({ type: ErrorResponse, description: 'Not found' })
  @ApiResponse({
    status: 500,
    description:
      'Argument passed in must be a single String of 12 bytes or a string of 24 hex characters',
    type: ErrorResponse,
  })
  async findOne(@Param('id') id): Promise<Note> {
    const note = await this.notesService.findOne(id);
    if (note) {
      return note;
    }
    throw new NotFoundException('Not Found', `id=${id}`);
  }

  @Post()
  @ApiOperation({ title: 'Create the note' })
  @ApiCreatedResponse({ type: Note })
  create(@Body() createNote: CreateNote): Promise<Note> {
    return this.notesService.create(createNote);
  }

  @Put(':id')
  @ApiOperation({ title: 'Update the note' })
  @ApiImplicitParam({ name: 'id' })
  @ApiOkResponse({ type: Note })
  @ApiNotFoundResponse({ type: ErrorResponse, description: 'Not found' })
  @ApiResponse({
    status: 500,
    description:
      'Argument passed in must be a single String of 12 bytes or a string of 24 hex characters',
    type: ErrorResponse,
  })
  async update(
    @Param('id') id,
    @Body() updatedNote: UpdateNote,
  ): Promise<Note> {
    const note = await this.notesService.update(id, updatedNote);
    if (note) {
      return note;
    }
    throw new NotFoundException('Not Found', `id=${id}`);
  }

  @Delete(':id')
  @ApiOperation({ title: 'Delete the note' })
  @ApiImplicitParam({ name: 'id' })
  @ApiOkResponse({ type: Note })
  @ApiNotFoundResponse({ type: ErrorResponse, description: 'Not found' })
  @ApiResponse({
    status: 500,
    description:
      'Argument passed in must be a single String of 12 bytes or a string of 24 hex characters',
    type: ErrorResponse,
  })
  async remove(@Param('id') id): Promise<Note> {
    const note = await this.notesService.remove(id);
    if (note) {
      return note;
    }
    throw new NotFoundException('Not Found', `id=${id}`);
  }
}
