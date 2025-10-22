
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

import {
  Injectable,
  NotFoundException,
  BadRequestException
} from '@nestjs/common';

import { Lesson } from './entities/lesson.entity';
import { Course } from 'src/courses/entities/course.entity';
import { Professor } from 'src/professors/entities/professor.entity';
import { Subject } from 'src/subjects/entities/subject.entity';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private lessonsRepository: Repository<Lesson>,
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
    @InjectRepository(Professor)
    private professorsRepository: Repository<Professor>,
    @InjectRepository(Subject)
    private subjectsRepository: Repository<Subject>,
  ) { }

  async create(dto: CreateLessonDto): Promise<Lesson> {
    const { startTime, endTime, courseId, professorId, subjectId } = dto;
    const start = new Date(startTime);
    const end = new Date(endTime);

    const course = await this.coursesRepository.findOne({ where: { id: courseId } });
    if (!course) throw new NotFoundException('Course not found');

    const professor = await this.professorsRepository.findOne({ where: { id: professorId } });
    if (!professor) throw new NotFoundException('Professor not found');

    const subject = await this.subjectsRepository.findOne({ where: { id: subjectId } });
    if (!subject) throw new NotFoundException('Subject not found');

    // check incongruenza inizio/fine

    if (start >= end) {
      throw new BadRequestException('startTime must be before endTime');
    }

    // check se inizio=fine

    if (start.getTime() === end.getTime()) {
      throw new BadRequestException('Lesson cannot have zero duration');
    }
    // check per sovrapposizione degli orari E professore presente a lezioni multiple

    const conflict = await this.lessonsRepository
      .createQueryBuilder('lesson')
      .leftJoin('lesson.course', 'course')
      .leftJoin('lesson.professor', 'professor')
      .where('(course.id = :courseId OR professor.id = :professorId)', { courseId, professorId })
      .andWhere('lesson.startTime < :end AND lesson.endTime > :start', { start, end })
      .getOne();

    if (conflict) {
      throw new BadRequestException(
        'Conflict: course or the professor already has a lesson in this time range'
      );
    }

    const lesson = this.lessonsRepository.create({
      startTime: start,
      endTime: end,
      course: course,
      professor: professor,
      subject: subject,
    });

    return this.lessonsRepository.save(lesson);
  }

  async findAll(): Promise<Lesson[]> {
    return this.lessonsRepository.find({
      relations: ['course', 'professor', 'subject'],
    })
  };

  async findOne(id: number): Promise<Lesson> {
    const lesson = await this.lessonsRepository.findOne({
      where: { id },
      relations: ['course', 'professor', 'subject'],
    });
    if (!lesson) throw new NotFoundException(`Lesson with id ${id} not found`);
    return lesson;
  }

  async update(id: number, dto: UpdateLessonDto): Promise<Lesson> {
    const lesson = await this.lessonsRepository.findOne({ where: { id } });
    if (!lesson) throw new NotFoundException(`Lesson with id ${id} not found`);


    if (dto.startTime) lesson.startTime = new Date(dto.startTime);
    if (dto.endTime) lesson.endTime = new Date(dto.endTime);
    if (dto.courseId) {
      const course = await this.coursesRepository.findOne({ where: { id: dto.courseId } });
      if (!course) throw new NotFoundException('Course not found');
      lesson.course = course;
    }
    if (dto.professorId) {
      const professor = await this.professorsRepository.findOne({ where: { id: dto.professorId } });
      if (!professor) throw new NotFoundException('Professor not found');
      lesson.professor = professor;
    }
    if (dto.subjectId) {
      const subject = await this.subjectsRepository.findOne({ where: { id: dto.subjectId } });
      if (!subject) throw new NotFoundException('Subject not found');
      lesson.subject = subject;
    }


    if (lesson.startTime >= lesson.endTime) {
      throw new BadRequestException('startTime must be before endTime');
    }


    const conflict = await this.lessonsRepository
      .createQueryBuilder('lesson')
      .leftJoin('lesson.course', 'course')
      .leftJoin('lesson.professor', 'professor')
      .where('(course.id = :courseId OR professor.id = :professorId)', { courseId: lesson.course.id, professorId: lesson.professor.id })
      .andWhere('lesson.startTime < :end AND lesson.endTime > :start', { start: lesson.startTime, end: lesson.endTime })
      .andWhere('lesson.id != :id', { id }) // <-- per escludere la lezione in questione
      .getOne();

    if (conflict) {
      throw new BadRequestException(
        'Conflict: either the course or the professor already has a lesson in this time range'
      );
    }

    return this.lessonsRepository.save(lesson);
  }
}
