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

  /**
   * Se viene passato status (es. "pending"), filtra.
   * Altrimenti restituisce tutti i risultati.
   */
  async findAll(status?: string): Promise<ExamResult[]> {
    const where = status
      ? { status: status as 'pending' | 'confirmed' | 'rejected' }
      : undefined;

    return this.examResultRepository.find({
      where,
      relations: [
        'examSession',
        'examSession.subject',
        'examSession.course',
        'student',
        'student.user',
      ],
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number): Promise<ExamResult> {
    const examResult = await this.examResultRepository.findOne({
      where: { id },
      relations: [
        'examSession',
        'examSession.subject',
        'examSession.course',
        'student',
        'student.user',
      ],
    });

    if (!examResult) {
      throw new NotFoundException(`ExamResult with ID ${id} not found`);
    }

    return examResult;
  }

  async create(createDto: CreateExamResultDto): Promise<ExamResult> {
    const examResult = this.examResultRepository.create({
      ...createDto,
      status: (createDto.status as any) ?? 'pending',
    });

    // calcola passed in base al voto (>= 18)
    if (typeof createDto.grade === 'number') {
      examResult.passed = createDto.grade >= 18;
    } else {
      examResult.passed = false;
    }

    return this.examResultRepository.save(examResult);
  }

  async update(
    id: number,
    updateDto: UpdateExamResultDto,
  ): Promise<ExamResult> {
    const examResult = await this.findOne(id);

    // Applico i cambi (grade / status / notes...)
    Object.assign(examResult, updateDto);

    // 1) Se aggiorno il voto, ricalcolo passed
    if (typeof updateDto.grade === 'number') {
      examResult.passed = updateDto.grade >= 18;
    }

    // 2) Se non ho cambiato il voto, ma sto confermando il risultato
    if (
      updateDto.status === 'confirmed' &&
      typeof examResult.grade === 'number'
    ) {
      examResult.passed = examResult.grade >= 18;
    }

    // 3) Se rifiuto il risultato, lo segno come non superato
    if (updateDto.status === 'rejected') {
      examResult.passed = false;
    }

    return this.examResultRepository.save(examResult);
  }

  async remove(id: number): Promise<void> {
    const examResult = await this.findOne(id);
    await this.examResultRepository.remove(examResult);
  }

  /**
   * Risultati filtrati per studente (per pagina studente).
   */
  async findByStudent(studentId: number): Promise<ExamResult[]> {
    return this.examResultRepository.find({
      where: { student_id: studentId },
      relations: [
        'examSession',
        'examSession.subject',
        'examSession.course',
        'student',
        'student.user',
      ],
      order: { id: 'DESC' },
    });
  }
}
