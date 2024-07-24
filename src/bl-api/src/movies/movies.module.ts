import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtStrategy } from 'src/jwt./jwt.strategy';

@Module({
  providers: [JwtStrategy, MoviesService, PrismaService],
  controllers: [MoviesController],
})
export class MoviesModule {}
