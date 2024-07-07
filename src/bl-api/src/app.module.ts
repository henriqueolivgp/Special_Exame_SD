import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { TeachersModule } from './teachers/teachers.module';
import { MoviesModule } from './movies/movies.module';
import { CastsService } from './casts/casts.service';
import { CastsModule } from './casts/casts.module';

@Module({
  imports: [MoviesModule, CastsModule],
  controllers: [AppController],
  providers: [AppService, CastsService],
})
export class AppModule {}
