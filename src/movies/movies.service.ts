import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly repository: Repository<Movie>,
  ) {}

  create(createMovieDto: CreateMovieDto) {
    const movie = this.repository.create(createMovieDto);
    return this.repository.save(movie);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOneBy({ id });
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
