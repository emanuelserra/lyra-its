import {
  IsNumber,
  IsNotEmpty,
  IsDateString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateLessonDto {
  @IsNumber()
  @IsNotEmpty()
  subject_id: number;

  @IsNumber()
  @IsOptional()
  professor_id?: number;

  @IsNumber()
  @IsNotEmpty()
  course_id: number;

  @IsDateString()
  @IsNotEmpty()
  lesson_date: string;

  @IsString()
  @IsNotEmpty()
  start_time: string;

  @IsString()
  @IsNotEmpty()
  end_time: string;
}
