import { NoteDto } from 'api';
import { ApiModelProperty } from '@nestjs/swagger';

export class Note implements NoteDto {
  @ApiModelProperty()
  readonly id: number;

  @ApiModelProperty({
    example: 'My note',
    description: 'The title of the note',
  })
  readonly title: string;

  @ApiModelProperty({
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At augue eget arcu dictum varius duis at consectetur. Felis imperdiet proin fermentum leo vel orci porta non pulvinar. Lacus suspendisse faucibus interdum posuere lorem ipsum dolor. Ornare aenean euismod elementum nisi. Euismod lacinia at quis risus sed vulputate. Id diam maecenas ultricies mi eget mauris pharetra et. Mi tempus imperdiet nulla malesuada pellentesque. Aliquet sagittis id consectetur purus ut faucibus. Nisl vel pretium lectus quam id. Eget egestas purus viverra accumsan in nisl. Amet luctus venenatis lectus magna fringilla urna porttitor rhoncus. Accumsan sit amet nulla facilisi morbi tempus iaculis. Est ullamcorper eget nulla facilisi etiam dignissim diam quis.',
    description: 'The content of the note',
  })
  readonly body: string;

  @ApiModelProperty({ enum: ['text'] })
  readonly type: 'text';
}
