// auth.module.ts
import { Module } from '@nestjs/common';
import { JwtStrategy } from 'src/jwt./jwt.strategy';
// import { JwtStrategy } from './auth-check.service';

@Module({
  providers: [JwtStrategy],
  controllers: [],
})
export class AuthModule {}
