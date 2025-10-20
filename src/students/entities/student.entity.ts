import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/users.entity';

@Entity('students')
export class Student {
  @PrimaryColumn()         // <-- user_id è la PK
  user_id: number;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'varchar', length: 20, unique: true, nullable: true })
  enrollment_number: string | null;

  @Column({ type: 'int', nullable: true })
  enrollment_year: number | null;

 @Column({ length: 20, default: 'active' })
 status: 'active' | 'graduated' | 'retired';
}


