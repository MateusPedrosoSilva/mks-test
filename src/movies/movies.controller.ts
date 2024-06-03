import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  NotFoundException,
  UseInterceptors,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@UseInterceptors(CacheInterceptor)
@CacheTTL(30)
@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new movie' })
  async create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  @ApiOperation({ summary: 'Return all the movies' })
  async findAll() {
    return this.moviesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Return one movie' })
  async findOne(@Param('id') id: string) {
    const movie = await this.moviesService.findOne(id);
    if (!movie) throw new NotFoundException();
    return movie;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update one movie' })
  async update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    const movie = await this.moviesService.update(id, updateMovieDto);
    if (!movie) throw new NotFoundException();
    return movie;
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Remove a movie' })
  async remove(@Param('id') id: string) {
    const movie = await this.moviesService.remove(id);
    if (!movie) throw new NotFoundException();
  }
}
