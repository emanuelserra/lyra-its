import {
    Entity,
    PrimaryGeneratedColumn,
    Column
} from 'typeorm';
/*
import { Course } from 'src/courses/entities/course.entity';
import { User } from 'src/users/entities/user.entity';
import { Attendance } from 'src/attendances/entities/attendance.entity';
*/

@Entity('lessons')
export class Lesson {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp' })
    startTime: Date;

    @Column({ type: 'timestamp' })
    endTime: Date;

    @Column()
    courseId: number;

    @Column()
    professorId: number;
}