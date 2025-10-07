import { Injectable, NotFoundException } from '@nestjs/common';
import { Lesson } from './lesson.entity';
import { CreateLessonDto } from './dto/create-lesson.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

@Injectable()
export class LessonsService {
  constructor(
  @InjectRepository(Lesson)
  private lessonRepository: Repository<Lesson>
  ){}

  create(dto: CreateLessonDto): Promise<any> {
    const newLesson= this.lessonRepository.create(dto);
    const saveLesson= this.lessonRepository.save(newLesson);
    return saveLesson;
  }
/*
  findAll(): Lesson[] {
    return this.lessons;
  }

  findOne(id: number): Lesson {
    const lesson = this.lessons.find(l => l.id === id);
    if (!lesson) throw new NotFoundException(`Lesson with id ${id} not found`);
    return lesson;
  }

  update(id: number, dto: UpdateLessonDto): Lesson {
    const lesson = this.findOne(id);
    Object.assign(lesson, dto, { updated_at: new Date() });
    return lesson;
  }

  remove(id: number): void {
    const index = this.lessons.findIndex(l => l.id === id);
    if (index === -1) throw new NotFoundException(`Lesson with id ${id} not found`);
    this.lessons.splice(index, 1);
  }
*/
}
