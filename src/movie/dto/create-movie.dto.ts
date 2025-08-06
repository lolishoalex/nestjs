import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMovieRequest {
  @ApiProperty({
    description: 'Movie name',
    example: 'Fight Club',
    type: String,
  })
  title: string;

  @ApiProperty({
    description: 'Release year',
    example: 1999,
    type: Number,
  })
  releaseYear: number;

  @ApiPropertyOptional({
    description: 'Movie poster link',
    example: 'https://storage.example.com/posters/123456.jpg',
    type: String,
  })
  poster?: string;

  @ApiProperty({
    description: 'Actor IDs',
    example: ['123', '456'],
    type: [String],
  })
  acrorIds: string[];
}
