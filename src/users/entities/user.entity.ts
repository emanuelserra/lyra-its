import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { Student } from '../../students/entities/student.entity';
import { Professor } from '../../professors/entities/professor.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  first_name: string;

  @Column({ length: 50 })
  last_name: string;

  @Column({ length: 70, unique: true })
  email: string;

  @Column({ type: 'text' })
  password_hash: string;

  @Column({ type: 'date', nullable: true })
  birth_date: Date;

  @Column({ length: 20 })
  phone: string;

  @Column({ length: 20 })
  role: 'student' | 'professor' | 'admin' | 'tutor';

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => Student, (student) => student.user)
  student: Student;

  @OneToOne(() => Professor, (professor) => professor.user)
  professor: Professor;
}
