import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from './entities/subject.entity';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Professor } from '../professors/entities/professor.entity';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
    @InjectRepository(Professor)
    private professorRepository: Repository<Professor>,
  ) {}

  async findAll(): Promise<Subject[]> {
    return this.subjectRepository.find({
      relations: ['course', 'lessons', 'professors', 'examSessions'],
    });
  }

  async findOne(id: number): Promise<Subject> {
    const subject = await this.subjectRepository.findOne({
      where: { id },
      relations: ['course', 'lessons', 'professors', 'examSessions'],
    });

    if (!subject) {
      throw new NotFoundException(`Subject with ID ${id} not found`);
    }

    return subject;
  }

  async create(createDto: CreateSubjectDto): Promise<Subject> {
    const subject = this.subjectRepository.create(createDto);
    return this.subjectRepository.save(subject);
  }

  async update(id: number, updateDto: UpdateSubjectDto): Promise<Subject> {
    const subject = await this.findOne(id);
    Object.assign(subject, updateDto);
    return this.subjectRepository.save(subject);
  }

  async remove(id: number): Promise<void> {
    const subject = await this.findOne(id);
    await this.subjectRepository.remove(subject);
  }

  async assignProfessor(subjectId: number, professorId: number): Promise<Subject> {
    const subject = await this.subjectRepository.findOne({
      where: { id: subjectId },
      relations: ['professors'],
    });

    if (!subject) {
      throw new NotFoundException(`Subject with ID ${subjectId} not found`);
    }

    const professor = await this.professorRepository.findOne({
      where: { id: professorId },
    });

    if (!professor) {
      throw new NotFoundException(`Professor with ID ${professorId} not found`);
    }

    if (!subject.professors) {
      subject.professors = [];
    }

    const alreadyAssigned = subject.professors.some(p => p.id === professorId);
    if (!alreadyAssigned) {
      subject.professors.push(professor);
      await this.subjectRepository.save(subject);
    }

    return this.findOne(subjectId);
  }

  async removeProfessor(subjectId: number, professorId: number): Promise<Subject> {
    const subject = await this.subjectRepository.findOne({
      where: { id: subjectId },
      relations: ['professors'],
    });

    if (!subject) {
      throw new NotFoundException(`Subject with ID ${subjectId} not found`);
    }

    subject.professors = subject.professors.filter(p => p.id !== professorId);
    await this.subjectRepository.save(subject);

    return this.findOne(subjectId);
  }
}
