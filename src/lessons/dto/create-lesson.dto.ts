<<<<<<< HEAD
import { Transform } from 'class-transformer';
import {
    IsDate,
    IsNumber,
    IsNotEmpty
} from 'class-validator';

export class CreateLessonDto {

    @Transform(({ value }) => new Date(value))
    @IsNotEmpty()
    @IsDate()
    startTime: Date;

    @IsNotEmpty()
    @Transform(({ value }) => new Date(value))
    @IsDate()
    endTime: Date;

    @IsNotEmpty()
    @IsNumber()
    courseId: number;

    @IsNotEmpty()
    @IsNumber()
    professorId: number;
}
=======
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
>>>>>>> 6d8a6cdaa944bec159f4970e52deef194a5c9eee
