import { Controller, Get } from '@nestjs/common';

@Controller('notes')
export class NotesController {

    @Get()
    getAll() {
        return [
            {
                title: 'First note',
                body: 'This is note body',
            }, {
                title: 'Another note',
                body: 'Some text',
            },
        ];
    }
}
