import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../users/entities/user.entity';
import { Student } from '../../students/entities/student.entity';
import { Professor } from '../../professors/entities/professor.entity';
import { Course } from '../../courses/entities/course.entity';
import { Subject } from '../../subjects/entities/subject.entity';
import { Lesson } from '../../lessons/entities/lesson.entity';
import { Attendance } from '../../attendances/entities/attendance.entity';
import { ExamSession } from '../../exam_sessions/entities/exam_session.entity';
import { ExamResult } from '../../exam_results/entities/exam_result.entity';
import { RefreshToken } from '../../auth/entities/refresh-token.entity';
import { UserRole } from '../../common/enums/user-role.enum';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(Professor)
    private professorRepository: Repository<Professor>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
    @InjectRepository(Attendance)
    private attendanceRepository: Repository<Attendance>,
    @InjectRepository(ExamSession)
    private examSessionRepository: Repository<ExamSession>,
    @InjectRepository(ExamResult)
    private examResultRepository: Repository<ExamResult>,
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  async seed() {
    await this.clearDatabase();
    await this.createCourses();
    await this.createUsers();
    await this.createSubjects();
    await this.createLessons();
    await this.createAttendances();
    await this.createExamSessions();
    await this.createExamResults();

    console.log('Database seeded successfully!');
  }

  private async clearDatabase() {
    const examResults = await this.examResultRepository.find();
    if (examResults.length > 0) {
      await this.examResultRepository.remove(examResults);
    }

    const attendances = await this.attendanceRepository.find();
    if (attendances.length > 0) {
      await this.attendanceRepository.remove(attendances);
    }

    const examSessions = await this.examSessionRepository.find();
    if (examSessions.length > 0) {
      await this.examSessionRepository.remove(examSessions);
    }

    const lessons = await this.lessonRepository.find();
    if (lessons.length > 0) {
      await this.lessonRepository.remove(lessons);
    }

    const subjects = await this.subjectRepository.find();
    if (subjects.length > 0) {
      await this.subjectRepository.remove(subjects);
    }

    const students = await this.studentRepository.find();
    if (students.length > 0) {
      await this.studentRepository.remove(students);
    }

    const professors = await this.professorRepository.find();
    if (professors.length > 0) {
      await this.professorRepository.remove(professors);
    }

    const refreshTokens = await this.refreshTokenRepository.find();
    if (refreshTokens.length > 0) {
      await this.refreshTokenRepository.remove(refreshTokens);
    }

    const users = await this.userRepository.find();
    if (users.length > 0) {
      await this.userRepository.remove(users);
    }

    const courses = await this.courseRepository.find();
    if (courses.length > 0) {
      await this.courseRepository.remove(courses);
    }
  }

  private async createUsers() {
    const password = await bcrypt.hash('password123', 10);

    await this.userRepository.save({
      first_name: 'Admin',
      last_name: 'System',
      email: 'admin@lyra.edu',
      password_hash: password,
      birth_date: new Date('1980-01-01'),
      phone: '+39 333 1234567',
      role: UserRole.ADMIN,
    });

    const prof1User = await this.userRepository.save({
      first_name: 'Mario',
      last_name: 'Rossi',
      email: 'mario.rossi@lyra.edu',
      password_hash: password,
      birth_date: new Date('1975-05-15'),
      phone: '+39 333 2345678',
      role: UserRole.PROFESSOR,
    });

    const prof2User = await this.userRepository.save({
      first_name: 'Laura',
      last_name: 'Bianchi',
      email: 'laura.bianchi@lyra.edu',
      password_hash: password,
      birth_date: new Date('1982-09-20'),
      phone: '+39 333 3456789',
      role: UserRole.PROFESSOR,
    });

    await this.userRepository.save({
      first_name: 'Anna',
      last_name: 'Tutor',
      email: 'anna.tutor@lyra.edu',
      password_hash: password,
      birth_date: new Date('1985-06-20'),
      phone: '+39 333 9999999',
      role: UserRole.TUTOR,
    });

    const student1User = await this.userRepository.save({
      first_name: 'Giovanni',
      last_name: 'Verdi',
      email: 'giovanni.verdi@student.lyra.edu',
      password_hash: password,
      birth_date: new Date('2000-03-10'),
      phone: '+39 333 4567890',
      role: UserRole.STUDENT,
    });

    const student2User = await this.userRepository.save({
      first_name: 'Sofia',
      last_name: 'Neri',
      email: 'sofia.neri@student.lyra.edu',
      password_hash: password,
      birth_date: new Date('2001-07-25'),
      phone: '+39 333 5678901',
      role: UserRole.STUDENT,
    });

    const student3User = await this.userRepository.save({
      first_name: 'Marco',
      last_name: 'Blu',
      email: 'marco.blu@student.lyra.edu',
      password_hash: password,
      birth_date: new Date('1999-11-30'),
      phone: '+39 333 6789012',
      role: UserRole.STUDENT,
    });

    await this.professorRepository.save({
      user: prof1User,
      department: 'Informatica',
      specialization: 'Programmazione',
    });

    await this.professorRepository.save({
      user: prof2User,
      department: 'Matematica',
      specialization: 'Analisi',
    });

    const course = await this.courseRepository.findOne({
      where: { name: 'Informatica' },
    });

    if (!course) {
      throw new Error('Course Informatica not found');
    }

    await this.studentRepository.save({
      user_id: student1User.id,
      course_id: course.id,
      enrollment_number: 'S001',
      enrollment_year: 2020,
    });

    await this.studentRepository.save({
      user_id: student2User.id,
      course_id: course.id,
      enrollment_number: 'S002',
      enrollment_year: 2021,
    });

    await this.studentRepository.save({
      user_id: student3User.id,
      course_id: course.id,
      enrollment_number: 'S003',
      enrollment_year: 2020,
    });
  }

  private async createCourses() {
    await this.courseRepository.save({
      name: 'Informatica',
      description: 'Corso di laurea triennale in Informatica',
      duration_years: 3,
      credits: 180,
    });

    await this.courseRepository.save({
      name: 'Matematica',
      description: 'Corso di laurea triennale in Matematica',
      duration_years: 3,
      credits: 180,
    });

    await this.courseRepository.save({
      name: 'Ingegneria Informatica',
      description: 'Corso di laurea magistrale in Ingegneria Informatica',
      duration_years: 2,
      credits: 120,
    });
  }

  private async createSubjects() {
    const course1 = await this.courseRepository.findOne({
      where: { name: 'Informatica' },
    });
    const course2 = await this.courseRepository.findOne({
      where: { name: 'Matematica' },
    });

    if (!course1 || !course2) {
      throw new Error('Courses not found');
    }

    await this.subjectRepository.save({
      name: 'Programmazione I',
      duration_hours: 60,
      course_id: course1.id,
    });

    await this.subjectRepository.save({
      name: 'Algoritmi e Strutture Dati',
      duration_hours: 80,
      course_id: course1.id,
    });

    await this.subjectRepository.save({
      name: 'Basi di Dati',
      duration_hours: 60,
      course_id: course1.id,
    });

    await this.subjectRepository.save({
      name: 'Analisi Matematica I',
      duration_hours: 60,
      course_id: course2.id,
    });

    await this.subjectRepository.save({
      name: 'Algebra Lineare',
      duration_hours: 40,
      course_id: course2.id,
    });
  }

  private async createLessons() {
    const prog1 = await this.subjectRepository.findOne({
      where: { name: 'Programmazione I' },
      relations: ['course'],
    });
    const asd = await this.subjectRepository.findOne({
      where: { name: 'Algoritmi e Strutture Dati' },
      relations: ['course'],
    });

    if (!prog1 || !asd) {
      throw new Error('Subjects not found');
    }

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);

    await this.lessonRepository.save({
      subject_id: prog1.id,
      course_id: prog1.course_id,
      lesson_date: lastWeek,
      start_time: '09:00',
      end_time: '11:00',
    });

    await this.lessonRepository.save({
      subject_id: prog1.id,
      course_id: prog1.course_id,
      lesson_date: yesterday,
      start_time: '09:00',
      end_time: '11:00',
    });

    await this.lessonRepository.save({
      subject_id: asd.id,
      course_id: asd.course_id,
      lesson_date: lastWeek,
      start_time: '14:00',
      end_time: '16:00',
    });

    await this.lessonRepository.save({
      subject_id: asd.id,
      course_id: asd.course_id,
      lesson_date: today,
      start_time: '14:00',
      end_time: '16:00',
    });
  }

  private async createAttendances() {
    const lessons = await this.lessonRepository.find();
    const students = await this.studentRepository.find();

    for (const lesson of lessons.slice(0, 2)) {
      for (const student of students) {
        await this.attendanceRepository.save({
          lesson_id: lesson.id,
          student_id: student.id,
          status: Math.random() > 0.3 ? 'present' : 'absent',
          justified: false,
        });
      }
    }
  }

  private async createExamSessions() {
    const prog1 = await this.subjectRepository.findOne({
      where: { name: 'Programmazione I' },
    });
    const asd = await this.subjectRepository.findOne({
      where: { name: 'Algoritmi e Strutture Dati' },
    });
    const bd = await this.subjectRepository.findOne({
      where: { name: 'Basi di Dati' },
    });

    if (!prog1 || !asd || !bd) {
      throw new Error('Subjects not found');
    }

    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    await this.examSessionRepository.save({
      subject_id: prog1.id,
      course_id: prog1.course_id,
      exam_date: nextMonth,
      exam_time: '09:00',
    });

    await this.examSessionRepository.save({
      subject_id: asd.id,
      course_id: asd.course_id,
      exam_date: nextMonth,
      exam_time: '14:00',
    });

    await this.examSessionRepository.save({
      subject_id: bd.id,
      course_id: bd.course_id,
      exam_date: nextMonth,
      exam_time: '09:00',
    });
  }

  private async createExamResults() {
    const sessions = await this.examSessionRepository.find({ take: 1 });
    const students = await this.studentRepository.find({ take: 2 });

    if (sessions.length > 0 && students.length > 0) {
      await this.examResultRepository.save({
        exam_session_id: sessions[0].id,
        student_id: students[0].id,
        grade: 28,
        passed: true,
      });

      if (students.length > 1) {
        await this.examResultRepository.save({
          exam_session_id: sessions[0].id,
          student_id: students[1].id,
          grade: 24,
          passed: true,
        });
      }
    }
  }
}
