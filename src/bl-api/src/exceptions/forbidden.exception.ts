// exceptions/forbidden.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  constructor(message: string = 'Forbidden') {
    super(message, HttpStatus.FORBIDDEN);
  }
}
