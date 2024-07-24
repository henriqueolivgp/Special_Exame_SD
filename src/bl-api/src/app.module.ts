import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { AuthModule } from './auth-check/auth-check.module';
import { RolesGuard } from './middlewares/VerifyRoles';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    MoviesModule,
    AuthModule,
    AuthModule, // Importa o módulo de autenticação
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecretKey', // Configura a chave secreta do JWT
      signOptions: { expiresIn: '1h' }, // Configura o tempo de expiração do token
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // Registro global do RolesGuard
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
