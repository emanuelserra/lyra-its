import { IsString, IsNumber, IsNotEmpty, Min, IsInt, Max, IsOptional } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  total_hours: number;

 @IsInt()
  @Min(0)
  @Max(100)
  @IsOptional()
  max_absence_percentage?: number
}
