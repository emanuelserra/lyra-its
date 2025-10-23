import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExamSession } from './entities/exam_session.entity';
import { CreateExamSessionDto } from './dto/create-exam_session.dto';
import { UpdateExamSessionDto } from './dto/update-exam_session.dto';

@Injectable()
export class ExamSessionsService {
  constructor(
    @InjectRepository(ExamSession)
    private readonly examSessionsRepository: Repository<ExamSession>,
  ) {}

  create(createExamSessionDto: CreateExamSessionDto) {
    const examSession = this.examSessionsRepository.create(createExamSessionDto);
    return this.examSessionsRepository.save(examSession);
  }

  findAll() {
    return this.examSessionsRepository.find();
  }

  async findOne(id: number) {
    const examSession = await this.examSessionsRepository.findOne({ where: { id } });
    if (!examSession) throw new NotFoundException(`Exam session #${id} not found`);
    return examSession;
  }

  async update(id: number, updateExamSessionDto: UpdateExamSessionDto) {
    await this.examSessionsRepository.update(id, updateExamSessionDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.examSessionsRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Exam session #${id} not found`);
    return { deleted: true };
  }
}
