import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @ApiProperty({ description: 'Name of the movie', default: 'Matrix' })
  name: string;

  @IsString()
  @ApiProperty({ description: 'Genre od the movie', default: 'Fiction' })
  genre: string;

  @IsString()
  @ApiProperty({
    description: 'Director of the movie',
    default: 'Peter Jackson',
  })
  director: string;

  @IsNumber()
  @ApiProperty({ description: 'Year of the movie', default: '2000' })
  year: number;
}
