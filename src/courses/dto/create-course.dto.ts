import { IsString, IsInt, Min, IsOptional } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  code?: string;

  @IsInt()
  @Min(1)
  duration_years: number;
}

