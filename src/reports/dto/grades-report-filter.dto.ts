
import { Type } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  IsDateString,
  Min,
  IsIn,
} from 'class-validator';

export class GradesReportFilterDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  course_id?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  subject_id?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  student_id?: number;

  @IsOptional()
  @IsDateString()
  from_date?: string; // ISO (YYYY-MM-DD)

  @IsOptional()
  @IsDateString()
  to_date?: string; // ISO (YYYY-MM-DD)

  // opzionale: se vuoi filtrare per stato voto
  @IsOptional()
  @IsIn(['pending', 'confirmed', 'rejected'])
  status?: 'pending' | 'confirmed' | 'rejected';
}
