import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessorCourses } from './entities/professor_course.entity';
import { ProfessorCourseService } from './professor_courses.service';
import { ProfessorCourseController } from './professor_courses.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProfessorCourses])],
  controllers: [ProfessorCourseController],
  providers: [ProfessorCourseService],
})
export class ProfessorCourseModule {}
