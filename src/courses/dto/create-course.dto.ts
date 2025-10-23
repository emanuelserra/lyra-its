import { IsString, IsNumber, IsNotEmpty, Min } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  duration_years: number;
}
