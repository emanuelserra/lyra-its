import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessorSubjects } from './entities/professor_subject.entity';
import { ProfessorSubjectService } from './professor_subjects.service';
import { ProfessorSubjectController } from './professor_subjects.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProfessorSubjects])],
  controllers: [ProfessorSubjectController],
  providers: [ProfessorSubjectService],
})
export class ProfessorSubjectModule {}

