import { Entity, PrimaryColumn, OneToOne, OneToMany, JoinColumn, Column } from 'typeorm';
import { User } from '../../users/entities/users.entity';
import { Subject } from '../../subjects/entities/subject.entity';

@Entity('professors')
export class Professor {
  @PrimaryColumn() //  è la FK verso users
  user_id: number;

  @Column({ length: 150 })
  subject: string;

  @OneToOne(() => User, user => user.professor)
  @OneToMany(() => Subject, (sub) => sub.professor)
  subjects: Subject[];
  
  @JoinColumn() // il lato "owner" della relazione
  user: User;
}

