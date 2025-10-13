import { Entity, PrimaryColumn, OneToOne, JoinColumn, Column } from 'typeorm';
import { User } from '../../users/entities/users.entity';

@Entity('professors')
export class Professor {
  @PrimaryColumn() //  è la FK verso users
  user_id: number;

  @Column({ length: 150 })
  subject: string;

  @OneToOne(() => User, user => user.professor)
  @JoinColumn() // il lato "owner" della relazione
  user: User;
}

