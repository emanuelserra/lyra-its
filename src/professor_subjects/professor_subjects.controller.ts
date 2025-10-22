import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ProfessorSubjectService } from './professor_subjects.service';
import { CreateProfessorSubjectDto } from './dto/create-professor_subject.dto';

@Controller('professor-subjects')
export class ProfessorSubjectController {
  constructor(private readonly professorSubjectService: ProfessorSubjectService) {}

  @Post()
  create(@Body() dto: CreateProfessorSubjectDto) {
    return this.professorSubjectService.create(dto);
  }

  @Get()
  findAll() {
    return this.professorSubjectService.findAll();
  }

  @Get(':professor_id/:subject_id')
  findOne(
    @Param('professor_id') professor_id: number,
    @Param('subject_id') subject_id: number,
  ) {
    return this.professorSubjectService.findOne(professor_id, subject_id);
  }

  @Delete(':professor_id/:subject_id')
  remove(
    @Param('professor_id') professor_id: number,
    @Param('subject_id') subject_id: number,
  ) {
    return this.professorSubjectService.remove(professor_id, subject_id);
  }
}
