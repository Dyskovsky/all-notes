import { ClientConfigDto as IClientConfigDto } from 'api';

export class ClientConfigDto implements IClientConfigDto {
  clientId: string;
  authDomain: string;
  authAudience: string;
}
