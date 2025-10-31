import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Subject } from '../../subjects/entities/subject.entity';
import { Course } from '../../courses/entities/course.entity';
import { Lesson } from '../../lessons/entities/lesson.entity';
import { ExamSession } from '../../exam_sessions/entities/exam_session.entity';

@Entity('professors')
export class Professor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  user_id: number;

  @OneToOne(() => User, (user) => user.professor, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToMany(() => Subject, (subject) => subject.professors)
  @JoinTable({
    name: 'professor_subjects',
    joinColumn: { name: 'professor_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'subject_id', referencedColumnName: 'id' },
  })
  subjects: Subject[];

  @ManyToMany(() => Course, (course) => course.professors)
  @JoinTable({
    name: 'professor_courses',
    joinColumn: { name: 'professor_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'course_id', referencedColumnName: 'id' },
  })
  courses: Course[];

  @OneToMany(() => Lesson, (lesson) => lesson.professor)
  lessons: Lesson[];

  @OneToMany(() => ExamSession, (session) => session.professor)
  examSessions: ExamSession[];
}
