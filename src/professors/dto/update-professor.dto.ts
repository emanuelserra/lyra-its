import { PartialType } from '@nestjs/mapped-types';
import { CreateProfessorDto } from './create-professor.dto';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateProfessorDto {
    @IsOptional()
    @IsString()
    @Length(1, 150)
    subject?: string;
}
