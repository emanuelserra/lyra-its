import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import { Subject } from './entities/subject.entity';
import { Professor } from '../professors/entities/professor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subject, Professor])],
  controllers: [SubjectsController],
  providers: [SubjectsService],
})
export class SubjectsModule {}
