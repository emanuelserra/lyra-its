import { IsInt } from 'class-validator';

export class CreateProfessorSubjectDto {
  @IsInt()
  professor_id: number;

  @IsInt()
  subject_id: number;
}

