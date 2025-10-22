import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { Student } from 'src/students/entities/student.entity';

@Entity('attendances')
@Unique(['lesson', 'student'])
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Lesson, (lesson) => lesson.attendance, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'lesson_id' })
  lesson: Lesson;

  @ManyToOne(() => Student, (student) => student.attendance, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @Column({
    type: 'varchar',
    length: 20,
  })
  status: 'present' | 'absent' | 'late' | 'early_exit';

  @Column({
    type: 'boolean',
    default: false
  })
  justified: boolean;

  @Column({
    type: 'text',
    nullable: true
  })
  note?: string;
}