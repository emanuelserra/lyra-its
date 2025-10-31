import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { User } from '../../users/entities/user.entity';
import { Student } from '../../students/entities/student.entity';
import { Professor } from '../../professors/entities/professor.entity';
import { Course } from '../../courses/entities/course.entity';
import { Subject } from '../../subjects/entities/subject.entity';
import { Lesson } from '../../lessons/entities/lesson.entity';
import { Attendance } from '../../attendances/entities/attendance.entity';
import { ExamSession } from '../../exam_sessions/entities/exam_session.entity';
import { ExamResult } from '../../exam_results/entities/exam_result.entity';
import { RefreshToken } from '../../auth/entities/refresh-token.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Student,
      Professor,
      Course,
      Subject,
      Lesson,
      Attendance,
      ExamSession,
      ExamResult,
      RefreshToken,
    ]),
  ],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
