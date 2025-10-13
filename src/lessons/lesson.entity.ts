import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Course } from '../courses/entities/course.entity';

@Entity('lessons')
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  // Relazione con Subject - semplifichiamo usando Course
  @ManyToOne(() => Course, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'subject_id' })
  subject: Course;

  @Column()
  subject_id: number;

  @Column({ nullable: true })
  professor_id?: number;

  @Column({ type: 'date' })
  lesson_date: string;

  @Column({ type: 'time' })
  start_time: string;

  @Column({ type: 'time' })
  end_time: string;

  @Column({ type: 'numeric', precision: 3, scale: 1, nullable: true })
  duration_hours?: number;

  @Column({
    type: 'varchar',
    length: 20,
    default: 'theory',
  })
  lesson_type?: string;

  @Column({ length: 50, nullable: true })
  classroom?: string;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
