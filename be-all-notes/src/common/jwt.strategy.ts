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

  /**
   * This method is used to return user object in case of valid authorization.
   *
   * If method doesn't return user, the client receives {"statusCode":401,"error":"Unauthorized"}.
   * If method returns error (done('error')), the client receives {"statusCode": 500, "message": "Internal server error"}.
   */
  async validate(payload: JwtPayload, done: VerifiedCallback): Promise<void> {
    if (
      xor(payload.scope.split(' '), ['openid', 'profile', 'email']).length > 0
    ) {
      throw new UnauthorizedException(
        'JWT does not possess the requires scope (`openid profile email`).',
      );
    }
    const profile: LoggedUser = {
      userId: payload.sub,
      roles: payload[`${process.env.AUTH_AUDIENCE}/roles`] || [],
    };
    done(null, profile);
  }
}


