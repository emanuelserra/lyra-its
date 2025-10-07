import {
  IsInt,
  IsDateString,
  IsString,
  IsNumber,
  IsOptional,
  IsIn,
  IsNotEmpty,
} from 'class-validator';

export class CreateLessonDto {
  @IsInt()
  subject_id: number;

  @IsOptional()
  @IsInt()
  professor_id?: number;

  @IsDateString()
  lesson_date: string; // formato ISO (es. "2025-10-02")

  @IsString()
  @IsNotEmpty()
  start_time: string; // es. "09:00:00"

  @IsString()
  @IsNotEmpty()
  end_time: string; // es. "11:00:00"

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 1 })
  duration_hours?: number;

  @IsOptional()
  @IsIn(['theory', 'lab', 'project'])
  lesson_type?: string;

  @IsOptional()
  @IsString()
  classroom?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
