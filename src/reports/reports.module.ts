
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from '../attendances/entities/attendance.entity';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';

import { ExamResult } from '../exam_results/entities/exam_result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExamResult, Attendance])],
  controllers: [ReportsController],
  providers: [ReportsService],
  exports: [ReportsService],
})
export class ReportsModule { }
