import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfessorSubjects } from './entities/professor_subject.entity';
import { CreateProfessorSubjectDto } from './dto/create-professor_subject.dto';

@Injectable()
export class ProfessorSubjectService {
  constructor(
    @InjectRepository(ProfessorSubjects)
    private readonly professorSubjectRepository: Repository<ProfessorSubjects>,
  ) {}

  async create(dto: CreateProfessorSubjectDto) {
    const relation = this.professorSubjectRepository.create(dto);
    return this.professorSubjectRepository.save(relation);
  }

  async findAll() {
    return this.professorSubjectRepository.find({
      relations: ['professor', 'subject'],
    });
  }

  async findOne(professor_id: number, subject_id: number) {
    return this.professorSubjectRepository.findOne({
      where: { professor_id, subject_id },
      relations: ['professor', 'subject'],
    });
  }

  async remove(professor_id: number, subject_id: number) {
    return this.professorSubjectRepository.delete({ professor_id, subject_id });
  }
}
