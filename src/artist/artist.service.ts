/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ArtistDto } from './dto/artist.dto';

@Injectable()
export class ArtistService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.artist.findMany();
  }

  async findOne(id: string) {
    const artist = await this.prismaService.artist.findUnique({
      where: {
        id,
      },
    });
    if (!artist) {
      throw new NotFoundException('Artist not found!');
    }
    return artist;
  }

  async create(dto: ArtistDto) {
    return this.prismaService.artist.create({
      data: {
        name: dto.name,
        genre: dto.genre,
      },
    });
  }
}
