export interface JwtPayload {
  /** Issuer (who created and signed this token, e.g. https://authorizationtest.eu.auth0.com/) */
  iss?: string;
  /** Subject (whom the token refers to, means user id) */
  sub?: string;
  /** Audience (who or what the token is intended for, e.g. ['http://localhost:3000', 'https://authorizationtest.eu.auth0.com/userinfo']) */
  aud?: string[];
  /** Issued at (seconds since Unix epoch) */
  iat?: number;
  /** Expiration time (seconds since Unix epoch) */
  exp?: number;
  /** Authorization party (the party to which this token was issued) */
  azp?: string;
  /** Token scope (what the token has access to, e.g. 'openid profile email') */
  scope?: string;
  // TODO find better way to manage user roles
  /** example: 'http://localhost:3000/roles': ['admin']; */
  [`process.env.AUTH_AUDIENCE}/roles`]?: string[];
}
