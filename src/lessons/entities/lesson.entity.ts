import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
} from 'typeorm';
import { Subject } from 'src/subjects/entities/subject.entity';
import { Course } from 'src/courses/entities/course.entity';
import { Professor } from 'src/professors/entities/professor.entity';
import { Attendance } from 'src/attendances/entities/attendance.entity';

@Entity('lessons')
export class Lesson {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp' })
    startTime: Date;

    @Column({ type: 'timestamp' })
    endTime: Date;

    @ManyToOne(() => Course, (course) => course.lessons, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'course_id' })
    course: Course;

    @ManyToOne(() => Professor, (professor) => professor.lessons, {
        onDelete: 'SET NULL',
    })
    @JoinColumn({ name: 'professor_id' })
    professor: Professor;

    @ManyToOne(() => Subject, (subject) => subject.lessons, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'subject_id' })
    subject: Subject;

    @OneToMany(() => Attendance, (attendance) => attendance.lesson, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    attendance: Attendance[];
}