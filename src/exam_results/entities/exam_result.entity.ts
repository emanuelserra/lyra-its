import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { ExamSession } from '../../exam_sessions/entities/exam_session.entity';
import { Student } from '../../students/entities/student.entity';

@Entity('exam_results')
@Unique(['exam_session_id', 'student_id'])
export class ExamResult {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  exam_session_id: number;

  @ManyToOne(() => ExamSession, (session) => session.results, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'exam_session_id' })
  examSession: ExamSession;

  @Column()
  student_id: number;

  @ManyToOne(() => Student, (student) => student.examResults, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @Column({ type: 'decimal', precision: 3, scale: 1, nullable: true })
  grade: number;

  @Column({ default: false })
  passed: boolean;
}
