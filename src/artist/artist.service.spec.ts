/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArtistService } from './artist.service';
import { v4 as uuidv4 } from 'uuid';
import { Artist } from '@prisma/client';
import { ArtistDto } from './dto/artist.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';

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

const db = {
  artist: {
    findMany: jest.fn().mockResolvedValue(artists),
    findUnique: jest.fn().mockResolvedValue(artist),
    create: jest.fn().mockResolvedValue(artist),
  },
};

describe('Artist service', () => {
  let service: ArtistService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArtistService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    service = module.get<ArtistService>(ArtistService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of artists', async () => {
    const artists = await service.findAll();
    expect(artists).toEqual(artists);
  });

  it('should return a single artist by id', async () => {
    expect(service.findOne(artistId)).resolves.toEqual(artist);
  });

  it('should create a new artist', async () => {
    expect(service.create(dto)).resolves.toEqual(artist);
  });
});
