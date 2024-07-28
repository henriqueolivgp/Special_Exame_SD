import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          if (request && request.cookies) {
            const token = request.cookies['token'];
            console.log('Token Extraído:', token);
            return token;
          }
          return null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: 'sd',
    });
  }

  async validate(payload: any) {
    // console.log('Payload do Token:', payload);
    // console.log('Payload do Role:', payload.tokenPayload.role);
    return { userId: payload.sub, roles: payload.tokenPayload.role };
  }
}
