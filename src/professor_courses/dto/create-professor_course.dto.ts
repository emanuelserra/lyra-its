import { IsInt } from 'class-validator';

export class CreateProfessorCourseDto {
  @IsInt()
  professor_id: number;

  @IsInt()
  course_id: number;
}

