import { IsDateString, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateExamSessionDto {
  @IsInt()
  subject_id: number;

  @IsInt()
  course_id: number;

  @IsOptional()
  @IsInt()
  professor_id?: number;

  @IsNotEmpty()
  @IsDateString()
  exam_date: string;
}
