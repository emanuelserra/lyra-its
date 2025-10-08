import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Course } from '../../courses/entities/course.entity'; // Cambia se il path è diverso

@Entity('subjects')
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  name: string;

  @Column({ name: 'duration_hours', type: 'int' })
  durationHours: number;

  @Column({ name: 'course_id' })
  courseId: number;

  @ManyToOne(() => Course, course => course.subjects, { onDelete: 'CASCADE' })
  course: Course;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

