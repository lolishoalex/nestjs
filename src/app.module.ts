import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ArtistModule } from './artist/artist.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistController } from './artist/artist.controller';
import { ArtistService } from './artist/artist.service';
import { PrismaService } from './prisma/prisma.service';
import { SpotifyModule } from './spotify/spotify.module';
import { getSpotifyConfig } from './config/spotify.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SpotifyModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getSpotifyConfig,
      inject: [ConfigService],
    }),
    PrismaModule,
    ArtistModule,
  ],
  controllers: [AppController, ArtistController],
  providers: [AppService, ArtistService, PrismaService],
})
export class AppModule {}
