import { v4 as uuidv4 } from 'uuid';
import { Artist } from '@prisma/client';
import { ArtistDto } from './dto/artist.dto';

const artistId = uuidv4();

const artists: Artist[] = [
  { id: artistId, name: 'Billie Eilish', genre: 'Pop' },
  { id: uuidv4(), name: 'The Weekend', genre: 'Pop' },
  { id: uuidv4(), name: 'Eminem', genre: 'Rap' },
];

const artist: Artist = artists[0];

const dto: ArtistDto = {
  name: artist.name,
  genre: artist.genre,
};
