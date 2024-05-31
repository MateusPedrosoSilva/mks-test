import { IsNumber, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  name: string;

  @IsString()
  genre: string;

  @IsString()
  director: string;

  @IsNumber()
  year: number;
}
