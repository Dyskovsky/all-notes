import { ClientConfigDto } from 'api';

export function toAuth0ClientOptions(clientConfigDto: ClientConfigDto): Auth0ClientOptions {
  return {
    domain: clientConfigDto.authDomain,
    client_id: clientConfigDto.clientId,
    redirect_uri: `${window.location.origin}`,
    audience: clientConfigDto.authAudience,
  };
}
