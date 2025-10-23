import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { LessonsModule } from './lessons/lessons.module';
import { AttendancesModule } from './attendances/attendances.module';
import { SubjectsModule } from './subjects/subjects.module';
import { StudentsModule } from './students/students.module';
import { ProfessorsModule } from './professors/professors.module';
import { ExamSessionsModule } from './exam_sessions/exam_sessions.module';
import { ExamResultsModule } from './exam_results/exam_results.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB_URL,
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    UsersModule,
    StudentsModule,
    ProfessorsModule,
    CoursesModule,
    SubjectsModule,
    LessonsModule,
    AttendancesModule,
    ExamSessionsModule,
    ExamResultsModule,
  ],
})
export class AppModule {}
