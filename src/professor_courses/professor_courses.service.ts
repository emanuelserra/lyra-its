import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfessorCourses } from './entities/professor_course.entity';
import { CreateProfessorCourseDto } from './dto/create-professor_course.dto';

@Injectable()
export class ProfessorCourseService {
  constructor(
    @InjectRepository(ProfessorCourses)
    private readonly professorCourseRepository: Repository<ProfessorCourses>,
  ) {}

  async create(dto: CreateProfessorCourseDto) {
    const relation = this.professorCourseRepository.create(dto);
    return this.professorCourseRepository.save(relation);
  }

  async findAll() {
    return this.professorCourseRepository.find({
      relations: ['professor', 'course'],
    });
  }

  async findOne(professor_id: number, course_id: number) {
    return this.professorCourseRepository.findOne({
      where: { professor_id, course_id },
      relations: ['professor', 'course'],
    });
  }

  async remove(professor_id: number, course_id: number) {
    return this.professorCourseRepository.delete({ professor_id, course_id });
  }
}
