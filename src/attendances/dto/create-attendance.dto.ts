import {
  IsNumber,
  IsNotEmpty,
  IsIn,
  IsBoolean,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAttendanceDto {
  @IsNumber()
  @IsNotEmpty()
  lesson_id: number;

  @IsNumber()
  @IsNotEmpty()
  student_id: number;

  @IsString()
  @IsNotEmpty()
  @IsIn(['present', 'absent', 'late', 'early_exit'])
  status: 'present' | 'absent' | 'late' | 'early_exit';

  @IsBoolean()
  @IsOptional()
  justified?: boolean;

  @IsString()
  @IsOptional()
  note?: string;
}
