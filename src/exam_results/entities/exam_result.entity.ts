import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('exam_results')
@Unique(['exam_session_id', 'student_id'])
export class ExamResult {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  exam_session_id: number;

  @Column()
  student_id: number;

  @Column({ type: 'numeric', precision: 3, scale: 1, nullable: true })
  grade: number;

  @Column({ default: false })
  passed: boolean;
}
