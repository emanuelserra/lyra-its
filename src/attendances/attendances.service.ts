import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from './entities/attendance.entity';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { AttendanceFilterDto } from './dto/attendance-filter.dto';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { Student } from 'src/students/entities/student.entity';

@Injectable()
export class AttendancesService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,
    @InjectRepository(Lesson)
    private readonly lessonsRepository: Repository<Lesson>,
    @InjectRepository(Student)
    private readonly studentsRepository: Repository<Student>,
  ) { }

  async create(dto: CreateAttendanceDto): Promise<Attendance> {
    const lesson = await this.lessonsRepository.findOne({ where: { id: dto.lessonId } });
    if (!lesson) throw new NotFoundException('Lesson not found');

    const student = await this.studentsRepository.findOne({ where: { id: dto.studentId } });
    if (!student) throw new NotFoundException('Student not found');

    const attendanceData: Partial<Attendance> = {
      lesson,
      student,
      status: dto.status,
      justified: dto.justified ?? false,
      note: dto.note ?? undefined,
    };

    const attendance = this.attendanceRepository.create(attendanceData as Attendance);

    return await this.attendanceRepository.save(attendance);


  }

  async findAll(filters: AttendanceFilterDto) {
    const { studentId, professorId, date } = filters;

    const query = this.attendanceRepository
      .createQueryBuilder('attendance')
      .leftJoinAndSelect('attendance.lesson', 'lesson')
      .leftJoinAndSelect('attendance.student', 'student')
      .leftJoinAndSelect('lesson.course', 'course')
      .leftJoinAndSelect('lesson.professor', 'professor')
      .leftJoinAndSelect('lesson.subject', 'subject');

    if (studentId) {
      query.andWhere('student.id = :studentId', { studentId });
    }

    if (professorId) {
      query.andWhere('professor.id = :professorId', { professorId });
    }

    if (date) {

      query.andWhere('DATE(lesson.startTime) = :date', { date });
    } //<--confronta solo la parte di data della lezione

    query.orderBy('lesson.startTime', 'DESC');

    return await query.getMany();
  }

  async findOne(id: number): Promise<Attendance> {
    const attendance = await this.attendanceRepository.findOne({
      where: { id },
      relations: ['lesson', 'student'],
    });

    if (!attendance) {
      throw new NotFoundException(`Attendance with id ${id} not found`);
    }

    return attendance;
  }

  async update(id: number, dto: UpdateAttendanceDto): Promise<Attendance> {
    const attendance = await this.attendanceRepository.findOne({ where: { id } });
    if (!attendance) throw new NotFoundException('Attendance not found');

    Object.assign(attendance, dto);
    return this.attendanceRepository.save(attendance);
  }

  async remove(id: number) {
    const result = await this.attendanceRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Attendance with id ${id} not found`);
    }
    return result;
  }
}
