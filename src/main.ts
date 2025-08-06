import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { logger } from './common/middlewares/logger.middleware';
import { ResponseInteceptor } from './common/interceptors/response.interceptor';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MovieModule } from './movie/movie.module';
import { MovieResponse } from './movie/dto/movie.dto';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalInterceptors(new ResponseInteceptor());

  app.useGlobalFilters(new AllExceptionsFilter());

  const config = new DocumentBuilder()
    .setTitle('Nest course API')
    .setDescription('API documentation for Nest course')
    .setVersion('1.0.0')
    .setContact('Coder Team', 'https://coderteam.com', 'support@coderteam.com')
    //.addBearerAuth()
    .setLicense('MIT', 'https://github.com')
    //.setTermsOfService('')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [MovieModule],
    //deepScanRoutes: true,
    extraModels: [MovieResponse],
    operationIdFactory: (controllerKey, methodKey) =>
      `${controllerKey}-${methodKey}`,
  });

  SwaggerModule.setup('/docs', app, document, {
    jsonDocumentUrl: '/swagger.json',
    yamlDocumentUrl: '/swagger.yaml',
    customSiteTitle: 'Nest JS API docs',
  });

  app.use(logger);

  await app.listen(3000);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
