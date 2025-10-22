import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Professor } from '../../professors/entities/professor.entity';
import { Subject } from '../../subjects/entities/subject.entity';

@Entity()
export class ProfessorSubjects {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Professor, (professor) => professor.professorSubjects)
  @JoinColumn({ name: 'professor_id' })
  professor: Professor;

  @ManyToOne(() => Subject, (subject) => subject.professorSubjects)
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;
}

