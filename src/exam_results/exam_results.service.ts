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
    private readonly examResultsRepository: Repository<ExamResult>,
  ) {}

  create(dto: CreateExamResultDto) {
    const result = this.examResultsRepository.create(dto);
    return this.examResultsRepository.save(result);
  }

  findAll() {
    return this.examResultsRepository.find();
  }

  async findOne(id: number) {
    const result = await this.examResultsRepository.findOne({ where: { id } });
    if (!result) throw new NotFoundException(`Exam result #${id} not found`);
    return result;
  }

  async update(id: number, dto: UpdateExamResultDto) {
    await this.examResultsRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const res = await this.examResultsRepository.delete(id);
    if (res.affected === 0) throw new NotFoundException(`Exam result #${id} not found`);
    return { deleted: true };
  }
}
