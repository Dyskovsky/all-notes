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
import { NoteDto, CreateNoteDto, UpdateNoteDto } from './classes';
import { ErrorResponse, LoggedUser, User } from '../models';
import { AuthGuard } from '@nestjs/passport';

// TODO add logging middleware
// TODO sorting/ the new one shoudl be on top

@ApiUseTags('notes')
@Controller('notes')
@UseGuards(AuthGuard('jwt'))
export class NotesController {
  constructor(private readonly notesService: NotesService) { }

  @Get()
  @ApiOperation({ title: 'Get all notes' })
  @ApiOkResponse({ type: [NoteDto] })
  getAll(@User() { userId }: LoggedUser): Promise<NoteDto[]> {
    return this.notesService.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({ title: 'Get single note' })
  @ApiImplicitParam({ name: 'id' })
  @ApiOkResponse({ type: NoteDto })
  @ApiNotFoundResponse({ type: ErrorResponse, description: 'Not found' })
  @ApiResponse({
    status: 500,
    description:
      'Argument passed in must be a single String of 12 bytes or a string of 24 hex characters',
    type: ErrorResponse,
  })
  async findOne(@Param('id') id, @User() { userId }: LoggedUser): Promise<NoteDto> {
    const noteDto = await this.notesService.findOne(id, userId);
    if (noteDto) {
      return noteDto;
    }
    throw new NotFoundException('Not Found', `id=${id}`);
  }

  @Post()
  @ApiOperation({ title: 'Create the note' })
  @ApiCreatedResponse({ type: NoteDto })
  create(@Body() createNoteDto: CreateNoteDto, @User() { userId }: LoggedUser): Promise<NoteDto> {
    return this.notesService.create(createNoteDto, userId);
  }

  @Put(':id')
  @ApiOperation({ title: 'Update the note' })
  @ApiImplicitParam({ name: 'id' })
  @ApiOkResponse({ type: NoteDto })
  @ApiNotFoundResponse({ type: ErrorResponse, description: 'Not found' })
  @ApiResponse({
    status: 500,
    description:
      'Argument passed in must be a single String of 12 bytes or a string of 24 hex characters',
    type: ErrorResponse,
  })
  async update(
    @Param('id') id,
    @Body() updatedNoteDto: UpdateNoteDto,
    @User() { userId }: LoggedUser,
  ): Promise<NoteDto> {
    const noteDto = await this.notesService.update(id, updatedNoteDto, userId);
    if (noteDto) {
      return noteDto;
    }
    throw new NotFoundException('Not Found', `id=${id}`);
  }

  @Delete(':id')
  @ApiOperation({ title: 'Delete the note' })
  @ApiImplicitParam({ name: 'id' })
  @ApiOkResponse({ type: NoteDto })
  @ApiNotFoundResponse({ type: ErrorResponse, description: 'Not found' })
  @ApiResponse({
    status: 500,
    description:
      'Argument passed in must be a single String of 12 bytes or a string of 24 hex characters',
    type: ErrorResponse,
  })
  async remove(@Param('id') id, @User() { userId }: LoggedUser): Promise<NoteDto> {
    const noteDto = await this.notesService.remove(id, userId);
    if (noteDto) {
      return noteDto;
    }
    throw new NotFoundException('Not Found', `id=${id}`);
  }
}
