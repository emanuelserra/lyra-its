import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Lesson } from '../../lessons/entities/lesson.entity';
import { Student } from '../../students/entities/student.entity';

@Entity('attendances')
@Unique(['lesson_id', 'student_id'])
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lesson_id: number;

  @ManyToOne(() => Lesson, (lesson) => lesson.attendances, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'lesson_id' })
  lesson: Lesson;

  @Column()
  student_id: number;

  @ManyToOne(() => Student, (student) => student.attendances, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @Column({ length: 20 })
  status: 'present' | 'absent' | 'late' | 'early_exit';

  @Column({ default: false })
  justified: boolean;

  @Column({ type: 'text', nullable: true })
  note: string;
}
