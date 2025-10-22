import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ProfessorCourseService } from './professor_courses.service';
import { CreateProfessorCourseDto } from './dto/create-professor_course.dto';

@Controller('professor-courses')
export class ProfessorCourseController {
  constructor(private readonly professorCourseService: ProfessorCourseService) {}

  @Post()
  create(@Body() dto: CreateProfessorCourseDto) {
    return this.professorCourseService.create(dto);
  }

  @Get()
  findAll() {
    return this.professorCourseService.findAll();
  }

  @Get(':professor_id/:course_id')
  findOne(
    @Param('professor_id') professor_id: number,
    @Param('course_id') course_id: number,
  ) {
    return this.professorCourseService.findOne(professor_id, course_id);
  }

  @Delete(':professor_id/:course_id')
  remove(
    @Param('professor_id') professor_id: number,
    @Param('course_id') course_id: number,
  ) {
    return this.professorCourseService.remove(professor_id, course_id);
  }
}
