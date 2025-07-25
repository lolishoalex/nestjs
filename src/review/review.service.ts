import { Injectable } from '@nestjs/common';
import { ReviewDto } from './dto/review.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Review } from '@prisma/client';

@Injectable()
export class ReviewService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: ReviewDto): Promise<Review> {
    const { text, rating, movieId } = dto;

    const review = await this.prismaService.review.create({
      data: {
        text,
        rating,
        movie: {
          connect: {
            id: movieId,
          },
        },
      },
    });

    return review;
  }
}
