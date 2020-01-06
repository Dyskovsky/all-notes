import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback, StrategyOptions } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { xor } from 'lodash';
import { LoggedUser, JwtPayload } from 'src/models';

const strategyOptions: StrategyOptions = {
  secretOrKeyProvider: passportJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH_DOMAIN}/.well-known/jwks.json`,
  }),
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  audience: process.env.AUTH_AUDIENCE,
  issuer: `https://${process.env.AUTH_DOMAIN}/`,
  ignoreExpiration: false,
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super(strategyOptions);
  }

  async validate(payload: JwtPayload, done: VerifiedCallback): Promise<any> {
    if (
      xor(payload.scope.split(' '), ['openid', 'profile', 'email']).length > 0
    ) {
      throw new UnauthorizedException(
        'JWT does not possess the requires scope (`openid profile email`).',
      );
    }
    const profile: LoggedUser = { userId: payload.sub, roles: payload[`${process.env.AUTH_AUDIENCE}/roles`] || [] };
    done(null, profile);
    // without returning user -> {"statusCode":401,"error":"Unauthorized"}
    // done("error"),  { "statusCode": 500, "message": "Internal server error" }
  }
}


