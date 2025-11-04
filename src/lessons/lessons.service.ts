import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Lesson } from './entities/lesson.entity';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Professor } from '../professors/entities/professor.entity';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
    @InjectRepository(Professor)
    private professorRepository: Repository<Professor>,
  ) {}

  async findAll(): Promise<Lesson[]> {
    return this.lessonRepository.find({
      relations: ['subject', 'professor', 'course', 'attendances'],
    });
  }

  async findOne(id: number): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOne({
      where: { id },
      relations: ['subject', 'professor', 'course', 'attendances'],
    });

    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }

    return lesson;
  }

  async create(createDto: CreateLessonDto): Promise<Lesson> {
    const lesson = this.lessonRepository.create(createDto);
    return this.lessonRepository.save(lesson);
  }

  async update(id: number, updateDto: UpdateLessonDto): Promise<Lesson> {
    const lesson = await this.findOne(id);
    Object.assign(lesson, updateDto);
    return this.lessonRepository.save(lesson);
  }

  async remove(id: number): Promise<void> {
    const lesson = await this.findOne(id);
    await this.lessonRepository.remove(lesson);
  }

  async findByProfessor(professorId: number): Promise<Lesson[]> {
    return this.lessonRepository.find({
      where: { professor_id: professorId },
      relations: ['subject', 'professor', 'course', 'attendances'],
      order: { lesson_date: 'DESC' },
    });
  }

  async findByProfessorSubjects(professorId: number): Promise<Lesson[]> {
    const professor = await this.professorRepository.findOne({
      where: { id: professorId },
      relations: ['subjects'],
    });

    if (!professor || !professor.subjects || professor.subjects.length === 0) {
      return [];
    }

    const subjectIds = professor.subjects.map(s => s.id);

    return this.lessonRepository.find({
      where: { subject_id: In(subjectIds) },
      relations: ['subject', 'professor', 'course', 'attendances'],
      order: { lesson_date: 'DESC' },
    });
  }

  async findByCourse(courseId: number): Promise<Lesson[]> {
    return this.lessonRepository.find({
      where: { course_id: courseId },
      relations: ['subject', 'professor', 'course', 'attendances'],
      order: { lesson_date: 'DESC' },
    });
  }
}
