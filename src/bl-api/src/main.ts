import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const port = process.env.BL_API_PORT || 8080;

  try {
    const app = await NestFactory.create(AppModule, { cors: true });
    console.log('entrei na api');
    await app.listen(port, () => {
      const address = `http://localhost:${port}`;
      logger.log(`Server is running on ${address}`);
      console.log('estou a ouvir');
    });
  } catch (err) {
    logger.error('Error starting server:', err);
    process.exit(1);
  }
}

bootstrap();
