import { Transform } from 'class-transformer';
import {
    IsDate,
    IsNumber,
    IsOptional
} from 'class-validator';

export class UpdateLessonDto {
    @IsOptional()
    @Transform(({ value }) => new Date(value))
    @IsDate()
    startTime?: Date;

    @IsOptional()
    @Transform(({ value }) => new Date(value))
    @IsDate()
    endTime?: Date;

    @IsOptional()
    @IsNumber()
    courseId?: number;

    @IsOptional()
    @IsNumber()
    professorId?: number;
}