import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  private courses: Course[] = [];
  private idCounter = 1;

  create(createCourseDto: CreateCourseDto): Course {
    const newCourse: Course = {
      id: this.idCounter++,
      created_at: new Date(),
      updated_at: new Date(),
      ...createCourseDto,
    };
    this.courses.push(newCourse);
    return newCourse;
  }

  findAll(): Course[] {
    return this.courses;
  }

  findOne(id: number): Course {
    const course = this.courses.find(c => c.id === id);
    if (!course) throw new NotFoundException(`Course with id ${id} not found`);
    return course;
  }

  update(id: number, updateCourseDto: UpdateCourseDto): Course {
    const course = this.findOne(id);
    Object.assign(course, updateCourseDto, { updated_at: new Date() });
    return course;
  }

  remove(id: number): void {
    const index = this.courses.findIndex(c => c.id === id);
    if (index === -1) throw new NotFoundException(`Course with id ${id} not found`);
    this.courses.splice(index, 1);
  }
}
