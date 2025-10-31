import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './entities/lesson.entity';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
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
}
