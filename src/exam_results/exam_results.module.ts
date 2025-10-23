import { Module } from '@nestjs/common';
import { ExamResultsService } from './exam_results.service';
import { ExamResultsController } from './exam_results.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamResult } from './entities/exam_result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExamResult])],
  controllers: [ExamResultsController],
  providers: [ExamResultsService],
})
export class ExamResultsModule {}
