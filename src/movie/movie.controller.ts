import { Controller, Get } from '@nestjs/common';
import { MovieService } from './movie.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Movie')
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  findAll() {
    return [
      {
        id: 1,
        title: 'Fight Club',
      },
      {
        id: 2,
        title: 'Pulp FSiction',
      },
    ];
  }
}
