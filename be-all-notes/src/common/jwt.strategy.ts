import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback, VerifyCallback, StrategyOptions } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { xor } from 'lodash';

const authConfig = {
  domain: 'authorizationtest.eu.auth0.com',
  audience: 'http://localhost:3000', // your api identifier
};

const strategyOptions: StrategyOptions = {
  secretOrKeyProvider: passportJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
  }),
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  ignoreExpiration: false,
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super(strategyOptions);
  }

  async validate(payload: any, done: VerifiedCallback): Promise<any> {
    // run only when token is valid
    // payload: {
    //   'http://localhost:3000/roles': ['admin'],
    //     iss: 'https://authorizationtest.eu.auth0.com/',
    //       sub: 'auth0|5dd2c3c134355e0f0ee91aa6',
    //         aud:
    //   ['http://localhost:3000',
    //     'https://authorizationtest.eu.auth0.com/userinfo'],
    //     iat: 1576188092,
    //       exp: 1576274492,
    //         azp: 'Q3bjtMILZBYNZh2IB54BKMT4eXzaba3X',
    //           scope: 'openid profile email'
    // }

    if (
      xor(payload.scope.split(' '), ['openid', 'profile', 'email']).length > 0
    ) {
      throw new UnauthorizedException(
        'JWT does not possess the requires scope (`openid profile email`).',
      );
    }
    const profile = { userId: payload.sub, username: payload.username };
    done(null, profile);
    // without done or return undefined -> {"statusCode":401,"error":"Unauthorized"}
    // done("error"),  { "statusCode": 500, "message": "Internal server error" }
  }
}


