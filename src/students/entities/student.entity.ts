import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Course } from '../../courses/entities/course.entity';
import { Attendance } from '../../attendances/entities/attendance.entity';
import { ExamResult } from '../../exam_results/entities/exam_result.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  user_id: number;

  @OneToOne(() => User, (user) => user.student, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  course_id: number;

  @ManyToOne(() => Course, (course) => course.students, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @Column({ length: 20, unique: true })
  enrollment_number: string;

  @Column()
  enrollment_year: number;

  @Column({ length: 20, default: 'active' })
  status: 'active' | 'graduated' | 'retired';

  @OneToMany(() => Attendance, (attendance) => attendance.student)
  attendances: Attendance[];

  @OneToMany(() => ExamResult, (result) => result.student)
  examResults: ExamResult[];
}
