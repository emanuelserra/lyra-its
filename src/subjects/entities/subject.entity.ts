import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Course } from '../../courses/entities/course.entity';
import { Lesson } from '../../lessons/entities/lesson.entity';
import { Professor } from '../../professors/entities/professor.entity';
import { ExamSession } from '../../exam_sessions/entities/exam_session.entity';

@Entity('subjects')
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  name: string;

  @Column()
  duration_hours: number;

  @Column()
  course_id: number;

  @ManyToOne(() => Course, (course) => course.subjects, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Lesson, (lesson) => lesson.subject)
  lessons: Lesson[];

  @ManyToMany(() => Professor, (professor) => professor.subjects)
  professors: Professor[];

  @OneToMany(() => ExamSession, (session) => session.subject)
  examSessions: ExamSession[];
}
