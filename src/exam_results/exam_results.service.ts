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

  async findAll(
  status?: string,
  sessionId?: number,
): Promise<ExamResult[]> {
  const where: any = {};

  if (status) {
    where.status = status;
  }
  if (sessionId) {
    where.exam_session_id = sessionId;
  }

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
  // 🔹 Controlla se esiste già un voto per lo stesso studente nella stessa sessione
  const existing = await this.examResultRepository.findOne({
    where: {
      exam_session_id: createDto.exam_session_id,
      student_id: createDto.student_id,
    },
  });

  // SE ESISTE → aggiorniamo invece di creare
  if (existing) {
    existing.grade = createDto.grade ?? existing.grade;
    existing.passed =
      typeof existing.grade === 'number' ? existing.grade >= 18 : false;
    existing.status = 'confirmed'; // lo mettiamo confermato
    return this.examResultRepository.save(existing);
  }

  // SE NON ESISTE → creiamo nuovo voto
  const examResult = this.examResultRepository.create({
    ...createDto,
    status: 'confirmed', // 🔹 niente pending
    passed:
      typeof createDto.grade === 'number' ? createDto.grade >= 18 : false,
  });

  return this.examResultRepository.save(examResult);
}


  async update(
  id: number,
  updateDto: UpdateExamResultDto,
): Promise<ExamResult> {
  const examResult = await this.findOne(id);

  const votoCambiato =
    typeof updateDto.grade === 'number' &&
    updateDto.grade !== examResult.grade;

  // Applico le modifiche
  Object.assign(examResult, updateDto);

  // Se il voto cambia → lo stato torna a pending
  if (votoCambiato) {
    examResult.status = 'pending';
    examResult.passed = false; // verrà ricalcolato quando confermato
  }

  // Se status è confermato → calcolo passed
  if (
    updateDto.status === 'confirmed' &&
    typeof examResult.grade === 'number'
  ) {
    examResult.passed = examResult.grade >= 18;
  }

  // Se status è rejected → forced fail
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
