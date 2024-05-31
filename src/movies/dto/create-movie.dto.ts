import { IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  name: string;

  @IsString()
  genre: string;

  @IsString()
  director: string;

  @IsString()
  year: number;
}
