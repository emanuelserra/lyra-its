import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ExamResult } from '../exam_results/entities/exam_result.entity';
import { GradesReportFilterDto } from './dto/grades-report-filter.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(ExamResult)
    private readonly examResultRepository: Repository<ExamResult>,
  ) {}

  async getGradesReport(filters: GradesReportFilterDto) {
    const qb = this.examResultRepository
      .createQueryBuilder('er')
      .leftJoinAndSelect('er.examSession', 'session')
      .leftJoinAndSelect('session.subject', 'subject')
      .leftJoinAndSelect('session.course', 'course')
      .leftJoinAndSelect('er.student', 'student')
      .leftJoinAndSelect('student.user', 'user');

    // Status
    if (filters.status) {
      qb.andWhere('er.status = :status', { status: filters.status });
    }

    // Course
    if (filters.course_id) {
      qb.andWhere('course.id = :courseId', { courseId: filters.course_id });
    }

    // Subject
    if (filters.subject_id) {
      qb.andWhere('subject.id = :subjectId', { subjectId: filters.subject_id });
    }

    // Student
    if (filters.student_id) {
      qb.andWhere('student.id = :studentId', {
        studentId: filters.student_id,
      });
    }

    // Date range
    if (filters.from_date) {
      qb.andWhere('session.exam_date >= :fromDate', {
        fromDate: filters.from_date,
      });
    }

    if (filters.to_date) {
      qb.andWhere('session.exam_date <= :toDate', {
        toDate: filters.to_date,
      });
    }

    qb.orderBy('session.exam_date', 'ASC');

    const results = await qb.getMany();

    // ------------------------
    //   Costruzione righe
    // ------------------------
    const rows = results.map((er) => {
      const s = er.examSession;
      const subj = s?.subject;
      const c = s?.course;
      const st = er.student;
      const u = st?.user;

      // 🔥 FIX: costruzione nome studente (compatibile con il tuo modello)
      const firstName = u?.first_name ?? u?.['firstName'] ?? '';
      const lastName = u?.last_name ?? u?.['lastName'] ?? '';
      const fullName = `${firstName} ${lastName}`.trim();

      const studentName =
        fullName.length > 0
          ? fullName
          : `Studente #${st?.id ?? er.student_id}`;

      return {
        id: er.id,
        student_id: st?.id ?? er.student_id,
        student_name: studentName,

        course_id: c?.id ?? null,
        course_name: c?.name ?? (c ? `Corso #${c.id}` : '—'),

        subject_id: subj?.id ?? null,
        subject_name: subj?.name ?? (subj ? `Materia #${subj.id}` : '—'),

        exam_session_id: s?.id ?? er.exam_session_id,
        exam_date: s?.exam_date ?? null,
        exam_time: s?.exam_time ?? null,

        grade: er.grade,
        passed: er.passed,
        status: er.status,
      };
    });

    // ------------------------
    //   Statistiche
    // ------------------------
    const onlyWithGrade = rows.filter((r) => typeof r.grade === 'number');

    const count = onlyWithGrade.length;
    let avg: number | null = null;
    let min: number | null = null;
    let max: number | null = null;

    if (count > 0) {
      const grades = onlyWithGrade.map((r) => r.grade as number);
      const sum = grades.reduce((acc, g) => acc + g, 0);
      avg = sum / count;
      min = Math.min(...grades);
      max = Math.max(...grades);
    }

    const passedCount = onlyWithGrade.filter((r) => r.passed).length;
    const failedCount = count - passedCount;
    const passRate = count > 0 ? passedCount / count : null;

    // Distribuzione voti
    const distribution: Record<string, number> = {};
    for (const r of onlyWithGrade) {
      const key = String(r.grade);
      distribution[key] = (distribution[key] ?? 0) + 1;
    }

    return {
      filtersApplied: filters,
      stats: {
        count,
        average: avg,
        min,
        max,
        passedCount,
        failedCount,
        passRate,
        distribution,
      },
      grades: rows,
    };
  }
}
