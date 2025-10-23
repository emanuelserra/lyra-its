import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Professor } from '../../professors/entities/professor.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @OneToOne(() => Professor, (professor) => professor.user)
  professor: Professor;
}
