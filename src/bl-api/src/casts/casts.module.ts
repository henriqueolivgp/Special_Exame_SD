import { Module } from '@nestjs/common';
import { CastsController } from './casts.controller';
import { PrismaService } from 'src/prisma.service';
import { CastsService } from './casts.service';

@Module({
  providers: [CastsService, PrismaService],
  controllers: [CastsController],
})
export class CastsModule {}
