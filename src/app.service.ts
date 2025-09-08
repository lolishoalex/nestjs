/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { SpotifyService } from './spotify/spotify.service';

@Injectable()
export class AppService {
  /*   hello() {
    return 'Hello World!';
  } */
  constructor(private readonly spotifyServise: SpotifyService) {}

  async getArtist(id: string) {
    const artist = await this.spotifyServise.getArtist(id);

    return artist;
  }

  async getAlbum(id: string) {
    const album = await this.spotifyServise.getAlbum(id);

    return {
      id: album.id,
      title: album.name,
      releaseDate: album.release_date,
      image: album.images[0].url,
      tracks: album.tracks.items.map((track) => ({
        id: track.id,
        name: track.name,
      })),
    };
  }
}
