import { IsString, IsNumber, IsNotEmpty, Min } from 'class-validator';

export class CreateSubjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  duration_hours: number;

  @IsNumber()
  @IsNotEmpty()
  course_id: number;
}
