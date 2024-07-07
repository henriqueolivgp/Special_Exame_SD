import { Module } from '@nestjs/common';
import { CastsController } from './casts.controller';

@Module({
  controllers: [CastsController]
})
export class CastsModule {}
