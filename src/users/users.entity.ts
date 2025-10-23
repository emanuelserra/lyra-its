import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password_hash: string;

  @Column()
  birth_date: Date;

  @Column()
  phone: string;

  @Column()
  role: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
