import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ForbiddenException } from '../exceptions/forbidden.exception';
// import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true; // Se não há roles definidas, permite o acesso
    }

    const req = context.switchToHttp().getRequest();

    const token = req.cookies.token;

    if (!token) {
      throw new ForbiddenException('No token found');
    }

    try {
      // Decodifica o token JWT para acessar o payload
      const decoded: any = jwt.decode(token);
      // console.log('Decoded Token Payload:', decoded);

      // Extraia as informações do payload
      const user = { userId: decoded.sub, roles: decoded.tokenPayload.role };

      // console.log(user.roles);

      if (!user || !user.roles) {
        throw new ForbiddenException('User roles are not defined');
      }

      const hasRole = roles.some((role) => user.roles.includes(role));
      if (!hasRole) {
        throw new ForbiddenException('User does not have the required roles');
      }

      return true;
    } catch {
      throw new ForbiddenException('Error in roles Guard');
    }
  }
}
