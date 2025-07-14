import { CreateMovieDto } from './dto/create-movie.dto';
import { MovieService } from './movie.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  findAll() {
    return this.movieService.findAll();
  }

  @Post()
  create(@Body() dto: CreateMovieDto) {
    return this.movieService.create(dto);
  }
}
