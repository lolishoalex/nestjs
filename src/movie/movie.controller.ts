import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import {
  //ApiBody,
  //ApiHeader,
  ApiOperation,
  //ApiParam,
  //ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Movie')
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ApiOperation({
    summary: 'Get films list',
    description: 'Calling back all films list',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Found films',
  })
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

  @ApiOperation({
    summary: 'Get film by ID',
    description: 'Calling back film info',
  })
  // @ApiParam({
  //   name: 'id',
  //   type: 'string',
  //   description: 'Film ID',
  // })
  // @ApiQuery({
  //   name: 'year',
  //   type: 'number',
  //   description: 'Filter by year',
  // })
  // @ApiHeader({
  //   name: 'X-Auth-Token',
  //   description: 'autorisation token',
  // })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Found film',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not Found film',
  })
  @Get(':id')
  findById(@Param('id') id: string, @Query('year') year: number) {
    return {
      id: 1,
      title: 'Fight Club',
    };
  }

  @Post()
  @ApiOperation({
    summary: 'Create film',
  })
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       title: { type: 'string', example: 'Fight Club' },
  //     },
  //   },
  // })
  create() {}
}
