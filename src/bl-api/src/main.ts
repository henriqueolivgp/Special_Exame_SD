import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const port = process.env.BL_API_PORT || 8080;
  // const portSwagger = process.env.SWAGGER_PORT;

  const config = new DocumentBuilder()
    .setTitle('Movies')
    .setDescription('')
    .setVersion('1.0')
    .addTag('')
    .build();

  try {
    const app = await NestFactory.create(AppModule); // , { cors: true }

    app.enableCors({
      origin: 'http://clh7d3f2zkrmq8wdahw04ocs.51.170.48.125.sslip.io',
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE'], // opcional, mas melhor que só GET
    });

    app.use(cookieParser());

    // Swagger
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/docs', app, document);

    app.use((req, res, next) => {
      console.log('Origin:', req.headers.origin);
      next();
    });

    await app.listen(port, () => {
      const address = `http://localhost:${port}`;
      logger.log(`Server is running on ${address}`);
      logger.log(`Swagger is running on ${address}/docs`);
    });
  } catch (err) {
    logger.error('Error starting server:', err);
    process.exit(1);
  }
}

bootstrap();
