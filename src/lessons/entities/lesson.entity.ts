import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Subject } from '../../subjects/entities/subject.entity';
import { Professor } from '../../professors/entities/professor.entity';
import { Course } from '../../courses/entities/course.entity';
import { Attendance } from '../../attendances/entities/attendance.entity';

@Entity('lessons')
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subject_id: number;

  @ManyToOne(() => Subject, (subject) => subject.lessons, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;

  @Column({ nullable: true })
  professor_id: number;

  @ManyToOne(() => Professor, (professor) => professor.lessons, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'professor_id' })
  professor: Professor;

  @Column()
  course_id: number;

  @ManyToOne(() => Course, (course) => course.lessons, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @Column({ type: 'date' })
  lesson_date: Date;

  @Column({ type: 'time' })
  start_time: string;

  @Column({ type: 'time' })
  end_time: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Attendance, (attendance) => attendance.lesson)
  attendances: Attendance[];
}
