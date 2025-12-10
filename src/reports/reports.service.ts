import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ExamResult } from '../exam_results/entities/exam_result.entity';
import { Attendance } from '../attendances/entities/attendance.entity';
import { GradesReportFilterDto } from './dto/grades-report-filter.dto';
import { AttendanceReportFilterDto } from './dto/attendance-report-filter.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(ExamResult)
    private readonly examResultRepository: Repository<ExamResult>,

    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,
  ) { }

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
      const firstName = u?.first_name ?? (u as any)?.firstName ?? '';
      const lastName = u?.last_name ?? (u as any)?.lastName ?? '';
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

  async getAttendanceReport(filters: AttendanceReportFilterDto) {
    const qb = this.attendanceRepository
      .createQueryBuilder('a')
      .leftJoinAndSelect('a.lesson', 'lesson')
      .leftJoinAndSelect('lesson.subject', 'subject')
      .leftJoinAndSelect('lesson.course', 'course')
      .leftJoinAndSelect('a.student', 'student')
      .leftJoinAndSelect('student.user', 'user');

    // Status
    if (filters.status) {
      qb.andWhere('a.status = :status', { status: filters.status });
    }

    // Justified
    if (typeof filters.justified === 'boolean') {
      qb.andWhere('a.justified = :justified', {
        justified: filters.justified,
      });
    }

    // Course
    if (filters.course_id) {
      qb.andWhere('course.id = :courseId', { courseId: filters.course_id });
    }

    // Subject
    if (filters.subject_id) {
      qb.andWhere('subject.id = :subjectId', {
        subjectId: filters.subject_id,
      });
    }

    // Student
    if (filters.student_id) {
      qb.andWhere('student.id = :studentId', {
        studentId: filters.student_id,
      });
    }

    // 🔴 Date range: usiamo lesson.lesson_date (type: date)
    if (filters.from_date) {
      qb.andWhere('lesson.lesson_date >= :fromDate', {
        fromDate: filters.from_date,
      });
    }

    if (filters.to_date) {
      qb.andWhere('lesson.lesson_date <= :toDate', {
        toDate: filters.to_date,
      });
    }

    qb.orderBy('lesson.lesson_date', 'ASC');

    const results = await qb.getMany();

    // ------------------------
    //   Costruzione righe
    // ------------------------
    const rows = results.map((a) => {
      const l = a.lesson as any;
      const subj = l?.subject;
      const c = l?.course;
      const st = a.student;
      const u = st?.user as any;

      const firstName = u?.first_name ?? u?.firstName ?? '';
      const lastName = u?.last_name ?? u?.lastName ?? '';
      const fullName = `${firstName} ${lastName}`.trim();

      const studentName =
        fullName.length > 0 ? fullName : `Studente #${st?.id ?? a.student_id}`;

      // 🔥 conversione robusta della data
      let lessonDate: string | null = null;
      if (l?.lesson_date) {
        // se è già stringa tipo "2025-11-30"
        if (typeof l.lesson_date === 'string') {
          lessonDate = l.lesson_date;
        } else {
          // se è un oggetto Date
          lessonDate = (l.lesson_date as Date).toISOString().slice(0, 10);
        }
      }

      return {
        id: a.id,
        student_id: st?.id ?? a.student_id,
        student_name: studentName,

        course_id: c?.id ?? null,
        course_name: c?.name ?? (c ? `Corso #${c.id}` : '—'),

        subject_id: subj?.id ?? null,
        subject_name: subj?.name ?? (subj ? `Materia #${subj.id}` : '—'),

        lesson_id: l?.id ?? a.lesson_id,

        lesson_date: lessonDate,
        lesson_start_time: l?.start_time ?? null,
        lesson_end_time: l?.end_time ?? null,

        status: a.status,
        justified: a.justified,
        note: a.note,
      };
    });
    // ------------------------
    //   Statistiche
    // ------------------------
    const total = rows.length;

    const presenceCount = rows.filter((r) => r.status === 'present').length;
    const absenceCount = rows.filter((r) => r.status === 'absent').length;
    const earlyExitCount = rows.filter((r) => r.status === 'early_exit').length;
    const lateCount = rows.filter((r) => r.status === 'late').length;
    const justifiedAbsenceCount = rows.filter(
      (r) => r.status === 'absent' && r.justified,
    ).length;

    const presenceRate = total > 0 ? presenceCount / total : null;
    const absenceRate = total > 0 ? absenceCount / total : null;

    // Distribuzione per stato
    const distributionByStatus: Record<string, number> = {};
    for (const r of rows) {
      const key = r.status;
      distributionByStatus[key] = (distributionByStatus[key] ?? 0) + 1;
    }

    // Trend per data (presence rate per giorno)
    const trendMap: Record<string, { present: number; total: number }> = {};

    for (const r of rows) {
      if (!r.lesson_date) continue;
      const dateKey = r.lesson_date; // è già una stringa "YYYY-MM-DD"

      if (!trendMap[dateKey]) {
        trendMap[dateKey] = { present: 0, total: 0 };
      }

      trendMap[dateKey].total += 1;
      if (r.status === 'present') {
        trendMap[dateKey].present += 1;
      }
    }

    const trendByDate = Object.entries(trendMap)
      .map(([date, { present, total }]) => ({
        date,
        presenceRate: total > 0 ? present / total : 0,
      }))
      .sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      );

    return {
      filtersApplied: filters,
      stats: {
        total,
        presenceCount,
        absenceCount,
        justifiedAbsenceCount,
        earlyExitCount,
        lateCount,
        presenceRate,
        absenceRate,
        distributionByStatus,
        trendByDate,
      },
      attendance: rows,
    };
  }
}
