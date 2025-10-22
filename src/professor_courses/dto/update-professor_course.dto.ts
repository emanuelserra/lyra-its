import { PartialType } from '@nestjs/mapped-types';
import { CreateProfessorCourseDto } from './create-professor_course.dto';

export class UpdateProfessorCourseDto extends PartialType(CreateProfessorCourseDto) {}
