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
    private examSessionRepository: Repository<ExamSession>,
  ) {}

  async findAll(): Promise<ExamSession[]> {
    return this.examSessionRepository.find({
      relations: ['subject', 'course', 'professor', 'results'],
      order: { exam_date: 'DESC' },
    });
  }

  async findOne(id: number): Promise<ExamSession> {
    const examSession = await this.examSessionRepository.findOne({
      where: { id },
      relations: ['subject', 'course', 'professor', 'results'],
    });

    if (!examSession) {
      throw new NotFoundException(`ExamSession with ID ${id} not found`);
    }

    return examSession;
  }

  async create(createDto: CreateExamSessionDto): Promise<ExamSession> {
    const examSession = this.examSessionRepository.create(createDto);
    return this.examSessionRepository.save(examSession);
  }

  async update(
    id: number,
    updateDto: UpdateExamSessionDto,
  ): Promise<ExamSession> {
    const examSession = await this.findOne(id);
    Object.assign(examSession, updateDto);
    return this.examSessionRepository.save(examSession);
  }

  async remove(id: number): Promise<void> {
    const examSession = await this.findOne(id);
    await this.examSessionRepository.remove(examSession);
  }
}
