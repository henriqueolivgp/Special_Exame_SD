import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const port = process.env.PORT;

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();

  try {
    const app = await NestFactory.create(AppModule, { cors: true });
    app.enableCors();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

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
