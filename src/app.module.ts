import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ArtistModule } from './artist/artist.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistController } from './artist/artist.controller';
import { ArtistService } from './artist/artist.service';
import { PrismaService } from './prisma/prisma.service';
import { SpotifyModule } from './spotify/spotify.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    ArtistModule,
    SpotifyModule,
  ],
  controllers: [AppController, ArtistController],
  providers: [AppService, ArtistService, PrismaService],
})
export class AppModule {}
