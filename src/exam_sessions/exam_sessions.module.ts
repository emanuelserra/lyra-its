import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamSessionsService } from './exam_sessions.service';
import { ExamSessionsController } from './exam_sessions.controller';
import { ExamSession } from './entities/exam_session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExamSession])],
  controllers: [ExamSessionsController],
  providers: [ExamSessionsService],
})
export class ExamSessionsModule {}
