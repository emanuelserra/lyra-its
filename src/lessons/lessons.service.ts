
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './entities/lesson.entity';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import {
  Injectable,
  NotFoundException,
  BadRequestException
} from '@nestjs/common';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private lessonsRepository: Repository<Lesson>,
  ) { }

  async create(dto: CreateLessonDto): Promise<Lesson> {
    const { startTime, endTime, courseId, professorId } = dto;
    const start = new Date(startTime);
    const end = new Date(endTime);

    // check incongruenza inizio/fine

    if (start >= end) {
      throw new BadRequestException('startTime must be before endTime');
    }

    // check per sovrapposizione degli orari E professore presente a lezioni multiple

    const conflict = await this.lessonsRepository
      .createQueryBuilder('lesson')
      .where('(lesson.courseId = :courseId OR lesson.professorId = :professorId)', { courseId, professorId })
      .andWhere('lesson.startTime < :end AND lesson.endTime > :start', { start, end })
      .getOne();

    if (conflict) {
      throw new BadRequestException(
        'Conflict: course or the professor already has a lesson in this time range'
      );
    }

    const lesson = this.lessonsRepository.create({ startTime: start, endTime: end, courseId, professorId });
    return this.lessonsRepository.save(lesson);
  }

  async findAll(): Promise<Lesson[]> {
    return this.lessonsRepository.find();
  }

  async findOne(id: number): Promise<Lesson> {
    const lesson = await this.lessonsRepository.findOneBy({ id });
    if (!lesson) throw new NotFoundException(`Lesson with id ${id} not found`);
    return lesson;
  }

  async update(id: number, dto: UpdateLessonDto): Promise<Lesson> {
    const lesson = await this.lessonsRepository.findOneBy({ id });
    if (!lesson) throw new NotFoundException(`Lesson with id ${id} not found`);


    if (dto.startTime) lesson.startTime = new Date(dto.startTime);
    if (dto.endTime) lesson.endTime = new Date(dto.endTime);
    if (dto.courseId) lesson.courseId = dto.courseId;
    if (dto.professorId) lesson.professorId = dto.professorId;


    if (lesson.startTime >= lesson.endTime) {
      throw new BadRequestException('startTime must be before endTime');
    }


    const conflict = await this.lessonsRepository
      .createQueryBuilder('lesson')
      .where('(lesson.courseId = :courseId OR lesson.professorId = :professorId)', { courseId: lesson.courseId, professorId: lesson.professorId })
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
