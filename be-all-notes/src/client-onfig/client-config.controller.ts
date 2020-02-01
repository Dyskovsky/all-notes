import { Controller, Get } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { ClientConfigDto } from './classes/client-config.dto';


@ApiUseTags('config')
@Controller('config')
export class ClientConfigController {

  @Get('frontend')
  @ApiOperation({ title: 'Get config for frontend site' })
  @ApiOkResponse({ type: [ClientConfigDto] })
  getAll(): Promise<ClientConfigDto> {
    const configDto: ClientConfigDto = {
      clientId: process.env.AUTH_CLIENT_ID,
      authDomain: process.env.AUTH_DOMAIN,
      authAudience: process.env.AUTH_AUDIENCE,
    };
    return Promise.resolve(configDto);
  }
}
