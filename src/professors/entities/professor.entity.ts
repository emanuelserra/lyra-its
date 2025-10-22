import { Entity, PrimaryColumn, OneToOne, OneToMany, JoinColumn, Column } from 'typeorm';
import { User } from '../../users/entities/users.entity';
import { Subject } from '../../subjects/entities/subject.entity';
import { ProfessorSubjects } from '../../professor_subjects/entities/professor_subject.entity';
import { Lesson } from 'src/lessons/lesson.entity';
import { ProfessorCourses } from '../../professor_courses/entities/professor_course.entity';


@Entity('professors')
export class Professor {
  @PrimaryColumn() //  è la FK verso users
  user_id: number;

  @Column({ length: 150 })
  subject: string;

  @OneToOne(() => User, user => user.professor)

  @OneToMany(() => ProfessorSubjects,(professorSubjects) => professorSubjects.professor)
  professorSubjects: ProfessorSubjects[]

  @OneToMany(() => Subject, (sub) => sub.professor)
  subjects: Subject[];

  @OneToMany(() => Lesson, (lesson) => lesson.professor)
  lesson: Lesson[];

  @OneToMany(() => ProfessorCourses, (professorCourses) => professorCourses.professor)
  professorCourses: ProfessorCourses[];
  
  @JoinColumn() // il lato "owner" della relazione
  user: User;
}

