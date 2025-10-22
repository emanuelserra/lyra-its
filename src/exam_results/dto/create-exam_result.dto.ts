import { IsBoolean, IsInt, IsNumber, IsOptional, Min, Max } from 'class-validator';

export class CreateExamResultDto {
  @IsInt()
  exam_session_id: number;

  @IsInt()
  student_id: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 1 })
  @Min(0)
  @Max(30)
  grade?: number;

  @IsOptional()
  @IsBoolean()
  passed?: boolean;
}
