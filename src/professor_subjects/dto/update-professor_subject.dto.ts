import { PartialType } from '@nestjs/mapped-types';
import { CreateProfessorSubjectDto } from './create-professor_subject.dto';

export class UpdateProfessorSubjectDto extends PartialType(CreateProfessorSubjectDto) {}
