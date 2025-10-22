import { Module } from '@nestjs/common';

import { UserModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CoursesModule } from './courses/courses.module';
import { LessonsModule } from './lessons/lessons.module';
import { AttendancesModule } from './attendances/attendances.module'
import { SubjectsModule } from './subjects/subjects.module';
import { StudentsModule } from './students/students.module';
import { ProfessorSubjectsModule } from './professor_subjects/professor_subjects.module';
import { ProfessorCoursesModule } from './professor_courses/professor_courses.module';
ConfigModule.forRoot();
@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
      ssl: true,
    }),
    UserModule,
    LessonsModule,
    AttendancesModule,
    CoursesModule,
    SubjectsModule,
    StudentsModule,
    ProfessorSubjectsModule,
    ProfessorCoursesModule,
  ],
})
export class AppModule { }