import {
  IsNumber,
  IsNotEmpty,
  IsDateString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateExamSessionDto {
  @IsNumber()
  @IsNotEmpty()
  subject_id: number;

  @IsNumber()
  @IsNotEmpty()
  course_id: number;

  @IsNumber()
  @IsOptional()
  professor_id?: number;

  @IsDateString()
  @IsNotEmpty()
  exam_date: string;

  @IsString()
  @IsOptional()
  exam_time?: string;
}
