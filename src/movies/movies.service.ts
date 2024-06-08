import { Inject, Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly repository: Repository<Movie>,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  create(createMovieDto: CreateMovieDto) {
    const movie = this.repository.create(createMovieDto);
    return this.repository.save(movie);
  }

  async findAll() {
    const cachedData = await this.cacheService.get<Movie[]>('findAll');
    if (cachedData) {
      // console.log('Data from cache');
      return cachedData;
    }
    const movies = await this.repository.find();
    await this.cacheService.set('findAll', movies);
    console.log('Data from DB');
    return movies;
  }

  async findOne(id: string) {
    const cachedData = await this.cacheService.get<Movie>(`find-${id}`);
    if (cachedData) {
      // console.log('Data from cache');
      return cachedData;
    }
    const movie = await this.repository.findOneBy({ id });
    await this.cacheService.set(`find-${id}`, movie);
    console.log('Data from DB');
    return movie;
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    const movie = await this.repository.findOneBy({ id });
    if (!movie) return null;
    this.repository.merge(movie, updateMovieDto);
    return this.repository.save(movie);
  }

  async remove(id: string) {
    const movie = await this.repository.findOneBy({ id });
    if (!movie) return null;
    return this.repository.remove(movie);
  }
}
