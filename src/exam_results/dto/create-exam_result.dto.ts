import {
  IsBoolean,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  Min,
  Max,
} from 'class-validator';

export class CreateExamResultDto {
  @IsNumber()
  @IsNotEmpty()
  exam_session_id: number;

  @IsNumber()
  @IsNotEmpty()
  student_id: number;

  @IsNumber({ maxDecimalPlaces: 1 })
  @IsOptional()
  @Min(0)
  @Max(30)
  grade?: number;

  @IsBoolean()
  @IsOptional()
  passed?: boolean;
}
