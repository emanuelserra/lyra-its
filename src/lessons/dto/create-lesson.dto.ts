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