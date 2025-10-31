import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Subject } from '../../subjects/entities/subject.entity';
import { Course } from '../../courses/entities/course.entity';
import { Professor } from '../../professors/entities/professor.entity';
import { ExamResult } from '../../exam_results/entities/exam_result.entity';

@Entity('exam_sessions')
export class ExamSession {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subject_id: number;

  @ManyToOne(() => Subject, (subject) => subject.examSessions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;

  @Column()
  course_id: number;

  @ManyToOne(() => Course, (course) => course.examSessions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @Column({ nullable: true })
  professor_id: number;

  @ManyToOne(() => Professor, (professor) => professor.examSessions, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'professor_id' })
  professor: Professor;

  @Column({ type: 'date' })
  exam_date: Date;

  @Column({ type: 'time', nullable: true })
  exam_time: string;

  @OneToMany(() => ExamResult, (result) => result.examSession)
  results: ExamResult[];
}
