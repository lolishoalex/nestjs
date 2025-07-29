import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ReviewModule } from './review/review.module';
import { ActorModule } from './actor/actor.module';
import { MovieModule } from './movie/movie.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    MovieModule,
    ReviewModule,
    ActorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

/* export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //consumer.apply(LoggingMiddlware).forRoutes('*'); all routs
    //consumer.apply(LoggingMiddlware).forRoutes(AppController); all routs in AppController
    //movies routs only fore create
    consumer
      .apply(LoggingMiddlware)
      .forRoutes({ path: '/movies', method: RequestMethod.POST });
  }
} */
