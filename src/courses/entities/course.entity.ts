import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Subject } from '../../subjects/entities/subject.entity';
import { Student } from '../../students/entities/student.entity';
import { Lesson } from '../../lessons/entities/lesson.entity';
import { Professor } from '../../professors/entities/professor.entity';
import { ExamSession } from '../../exam_sessions/entities/exam_session.entity';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  name: string;

  @Column()
  duration_years: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Subject, (subject) => subject.course)
  subjects: Subject[];

  @OneToMany(() => Student, (student) => student.course)
  students: Student[];

  @OneToMany(() => Lesson, (lesson) => lesson.course)
  lessons: Lesson[];

  @ManyToMany(() => Professor, (professor) => professor.courses)
  professors: Professor[];

  @OneToMany(() => ExamSession, (session) => session.course)
  examSessions: ExamSession[];
}
