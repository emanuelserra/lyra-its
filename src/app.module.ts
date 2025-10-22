import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CoursesModule } from './courses/courses.module';
import { LessonsModule } from './lessons/lessons.module';
import { SubjectsModule } from './subjects/subjects.module';
import { ExamSessionsModule } from './exam_sessions/exam_sessions.module';
import { ExamResultsModule } from './exam_results/exam_results.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),
    LessonsModule,
    CoursesModule,
    SubjectsModule,
    ExamSessionsModule,
    ExamResultsModule,
  ],
})
export class AppModule {}
