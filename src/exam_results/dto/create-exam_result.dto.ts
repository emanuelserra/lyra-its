import {
  IsNumber,
  IsNotEmpty,
  IsOptional,
  Min,
  Max,
  IsString,
  IsIn,
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

  // il client può opzionalmente specificare lo stato, altrimenti il service mette 'pending'
  @IsString()
  @IsOptional()
  @IsIn(['pending', 'confirmed', 'rejected'])
  status?: 'pending' | 'confirmed' | 'rejected';

  @IsString()
  @IsOptional()
  notes?: string;
}
