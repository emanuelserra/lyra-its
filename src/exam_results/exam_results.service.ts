import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExamResult } from './entities/exam_result.entity';
import { CreateExamResultDto } from './dto/create-exam_result.dto';
import { UpdateExamResultDto } from './dto/update-exam_result.dto';

@Injectable()
export class ExamResultsService {
  constructor(
    @InjectRepository(ExamResult)
    private examResultRepository: Repository<ExamResult>,
  ) {}

  async findAll(): Promise<ExamResult[]> {
    return this.examResultRepository.find({
      relations: ['examSession', 'student'],
    });
  }

  async findOne(id: number): Promise<ExamResult> {
    const examResult = await this.examResultRepository.findOne({
      where: { id },
      relations: ['examSession', 'student'],
    });

    if (!examResult) {
      throw new NotFoundException(`ExamResult with ID ${id} not found`);
    }

    return examResult;
  }

  async create(createDto: CreateExamResultDto): Promise<ExamResult> {
    const examResult = this.examResultRepository.create(createDto);
    return this.examResultRepository.save(examResult);
  }

  async update(
    id: number,
    updateDto: UpdateExamResultDto,
  ): Promise<ExamResult> {
    const examResult = await this.findOne(id);
    Object.assign(examResult, updateDto);
    return this.examResultRepository.save(examResult);
  }

  async remove(id: number): Promise<void> {
    const examResult = await this.findOne(id);
    await this.examResultRepository.remove(examResult);
  }

  async findByStudent(studentId: number): Promise<ExamResult[]> {
    return this.examResultRepository.find({
      where: { student_id: studentId },
      relations: ['examSession', 'student', 'examSession.subject'],
    });
  }
}
