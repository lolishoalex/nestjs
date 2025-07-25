import { Injectable, NotFoundException } from '@nestjs/common';
import { MovieDto } from './dto/movie.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Movie } from '@prisma/client';

@Injectable()
export class MovieService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return await this.prismaService.movie.findMany({
      where: {
        isAvailable: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        actors: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async findById(id: string): Promise<Movie> {
    const movie = await this.prismaService.movie.findUnique({
      where: {
        id,
      },
      include: {
        actors: true,
        poster: true,
        reviews: true,
      },
    });

    if (!movie || !movie.isAvailable)
      throw new NotFoundException('Film not found');
    return movie;
  }

  async create(dto: MovieDto): Promise<Movie> {
    const { title, releaseYear, imageUrl, actorIds } = dto;

    const actors = await this.prismaService.actor.findMany({
      where: {
        id: {
          in: actorIds,
        },
      },
    });

    if (!actors || !actors.length)
      throw new NotFoundException('One or few acrors not found');

    const movie = await this.prismaService.movie.create({
      data: {
        title,
        releaseYear,
        poster: imageUrl
          ? {
              create: {
                url: imageUrl,
              },
            }
          : undefined,
        actors: {
          connect: actors.map((actor) => ({
            id: actor.id,
          })),
        },
      },
    });

    return movie;
  }

  async update(id: string, dto: MovieDto): Promise<boolean> {
    const movie = await this.findById(id);

    const actors = await this.prismaService.actor.findMany({
      where: {
        id: {
          in: dto.actorIds,
        },
      },
    });

    if (!actors || !actors.length)
      throw new NotFoundException('One or few acrors not found');

    await this.prismaService.movie.update({
      where: {
        id: movie.id,
      },
      data: {
        title: dto.title,
        releaseYear: dto.releaseYear,
        poster: dto.imageUrl
          ? {
              create: {
                url: dto.imageUrl,
              },
            }
          : undefined,
        actors: {
          connect: actors.map((actor) => ({
            id: actor.id,
          })),
        },
      },
    });

    return true;
  }

  async updateIsPublic(id: string, dto: MovieDto): Promise<Movie> {
    const movie = await this.prismaService.movie.findUnique({
      where: {
        id,
      },
    });

    if (!movie) throw new NotFoundException('Film not found');

    const updatedMovie = await this.prismaService.movie.update({
      where: {
        id,
      },
      data: {
        isAvailable: dto.isAvailable ?? movie.isAvailable,
        title: dto.title ?? movie.title,
        releaseYear: dto.releaseYear ?? movie.releaseYear,
      },
      include: {
        actors: true,
        poster: true,
      },
    });

    return updatedMovie;
  }

  async delete(id: string): Promise<string> {
    const movie = await this.findById(id);

    await this.prismaService.movie.delete({
      where: {
        id,
      },
    });

    return movie.id;
  }
}
