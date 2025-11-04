import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Professor } from './entities/professor.entity';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { Course } from '../courses/entities/course.entity';

@Injectable()
export class ProfessorsService {
  constructor(
    @InjectRepository(Professor)
    private professorRepository: Repository<Professor>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  async findAll(): Promise<Professor[]> {
    return this.professorRepository.find({
      relations: ['user', 'subjects', 'courses', 'lessons', 'examSessions'],
    });
  }

  async findOne(id: number): Promise<Professor> {
    const professor = await this.professorRepository.findOne({
      where: { id },
      relations: ['user', 'subjects', 'courses', 'lessons', 'examSessions'],
    });

    if (!professor) {
      throw new NotFoundException(`Professor with ID ${id} not found`);
    }

    return professor;
  }

  async create(createDto: CreateProfessorDto): Promise<Professor> {
    const professor = this.professorRepository.create(createDto);
    return this.professorRepository.save(professor);
  }

  async update(id: number, updateDto: UpdateProfessorDto): Promise<Professor> {
    const professor = await this.findOne(id);
    Object.assign(professor, updateDto);
    return this.professorRepository.save(professor);
  }

  async remove(id: number): Promise<void> {
    const professor = await this.findOne(id);
    await this.professorRepository.remove(professor);
  }

  async findByUserId(userId: number): Promise<Professor> {
    const professor = await this.professorRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user', 'subjects', 'courses', 'lessons', 'examSessions'],
    });

    if (!professor) {
      throw new NotFoundException(
        `Professor with user ID ${userId} not found`,
      );
    }

    return professor;
  }

  async getLessons(userId: number): Promise<any[]> {
    const professor = await this.findByUserId(userId);
    return professor.lessons || [];
  }

  async getSubjects(userId: number): Promise<any[]> {
    const professor = await this.findByUserId(userId);
    return professor.subjects || [];
  }

  async assignCourse(professorId: number, courseId: number): Promise<Professor> {
    const professor = await this.professorRepository.findOne({
      where: { id: professorId },
      relations: ['courses'],
    });

    if (!professor) {
      throw new NotFoundException(`Professor with ID ${professorId} not found`);
    }

    const course = await this.courseRepository.findOne({
      where: { id: courseId },
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }

    if (!professor.courses) {
      professor.courses = [];
    }

    const alreadyAssigned = professor.courses.some(c => c.id === courseId);
    if (!alreadyAssigned) {
      professor.courses.push(course);
      await this.professorRepository.save(professor);
    }

    return this.findOne(professorId);
  }

  async removeCourse(professorId: number, courseId: number): Promise<Professor> {
    const professor = await this.professorRepository.findOne({
      where: { id: professorId },
      relations: ['courses'],
    });

    if (!professor) {
      throw new NotFoundException(`Professor with ID ${professorId} not found`);
    }

    professor.courses = professor.courses.filter(c => c.id !== courseId);
    await this.professorRepository.save(professor);

    return this.findOne(professorId);
  }
}
