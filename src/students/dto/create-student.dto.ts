import { IsNotEmpty, IsNumber, IsString, IsIn, Min } from 'class-validator';

export class CreateStudentDto {
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsNumber()
  @IsNotEmpty()
  course_id: number;

  @IsString()
  @IsNotEmpty()
  enrollment_number: string;

  @IsNumber()
  @Min(1900)
  enrollment_year: number;

  @IsString()
  @IsIn(['active', 'graduated', 'retired'])
  status?: 'active' | 'graduated' | 'retired';
}
