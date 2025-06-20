// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Request } from 'express';

declare module 'express' {
  export interface Request {
    cookies: any;
    user: {
      id: string;
      role: string;
    };
  }
}
