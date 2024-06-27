import { Injectable } from '@nestjs/common';

console.log('estou no app service');

@Injectable()
export class AppService {
  getHello(): string {
    console.log('ola mundo');
    return 'Hello World!';
  }
}
