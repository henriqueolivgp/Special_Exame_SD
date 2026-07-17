import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // MUDANÇA AQUI: Diz ao NestJS para ir buscar o token ao cabeçalho Authorization
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
      ignoreExpiration: false,
      secretOrKey: 'sd', 
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, roles: payload.tokenPayload.role };
  }
}