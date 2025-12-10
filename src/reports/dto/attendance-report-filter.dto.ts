import { Type } from 'class-transformer';
import {
    IsInt,
    IsOptional,
    IsDateString,
    Min,
    IsIn,
    IsBoolean,
} from 'class-validator';

export class AttendanceReportFilterDto {
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

    @IsOptional()
    @IsIn(['present', 'absent', 'late', 'early_exit'])
    status?: 'present' | 'absent' | 'late' | 'early_exit';

    @IsOptional()
    @Type(() => Boolean)
    @IsBoolean()
    justified?: boolean;
}