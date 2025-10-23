import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('exam_sessions')
export class ExamSession {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subject_id: number;

  @Column()
  course_id: number;

  @Column({ nullable: true })
  professor_id: number;

  @Column({ type: 'date' })
  exam_date: Date;
}
