/* eslint-disable @typescript-eslint/no-floating-promises */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const config = app.get(ConfigService);

  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: config.getOrThrow<string>('ALLOWED_ORIGINS').split(','),
    // origin: * if from all domains
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    exposedHeaders: ['Set-Cookie', 'Content-Disposition'],
    allowedHeaders: ['Authorization', 'X-Api-Key'],
    //allowedHeaders: '*',
  });

  await app.listen(3000);
}
bootstrap();
