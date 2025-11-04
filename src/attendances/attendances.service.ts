import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from './entities/attendance.entity';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { Lesson } from '../lessons/entities/lesson.entity';

@Injectable()
export class AttendancesService {
  constructor(
    @InjectRepository(Attendance)
    private attendanceRepository: Repository<Attendance>,
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
  ) {}

  async findAll(): Promise<Attendance[]> {
    return this.attendanceRepository.find({
      relations: ['lesson', 'student'],
    });
  }

  async findOne(id: number): Promise<Attendance> {
    const attendance = await this.attendanceRepository.findOne({
      where: { id },
      relations: ['lesson', 'student'],
    });

    if (!attendance) {
      throw new NotFoundException(`Attendance with ID ${id} not found`);
    }

    return attendance;
  }

  async create(createDto: CreateAttendanceDto): Promise<Attendance> {
    const attendance = this.attendanceRepository.create(createDto);
    return this.attendanceRepository.save(attendance);
  }

  async update(
    id: number,
    updateDto: UpdateAttendanceDto,
  ): Promise<Attendance> {
    const attendance = await this.findOne(id);
    Object.assign(attendance, updateDto);
    return this.attendanceRepository.save(attendance);
  }

  async remove(id: number): Promise<void> {
    const attendance = await this.findOne(id);
    await this.attendanceRepository.remove(attendance);
  }

  async findByStudent(studentId: number): Promise<Attendance[]> {
    return this.attendanceRepository.find({
      where: { student_id: studentId },
      relations: ['lesson', 'student', 'lesson.subject'],
    });
  }

  async findByLesson(lessonId: number): Promise<Attendance[]> {
    return this.attendanceRepository.find({
      where: { lesson_id: lessonId },
      relations: ['lesson', 'student', 'student.user'],
    });
  }

  async selfMarkAttendance(
    studentId: number,
    lessonId: number,
    status: 'present' | 'late' | 'early_exit',
  ): Promise<Attendance> {
    const lesson = await this.lessonRepository.findOne({
      where: { id: lessonId },
    });

    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${lessonId} not found`);
    }

    const today = new Date();
    const lessonDate = new Date(lesson.lesson_date);

    if (
      lessonDate.getDate() !== today.getDate() ||
      lessonDate.getMonth() !== today.getMonth() ||
      lessonDate.getFullYear() !== today.getFullYear()
    ) {
      throw new BadRequestException('You can only mark attendance for today\'s lessons');
    }

    const existing = await this.attendanceRepository.findOne({
      where: { lesson_id: lessonId, student_id: studentId },
    });

    if (existing) {
      if (existing.confirmed) {
        throw new BadRequestException('Attendance already confirmed by professor');
      }
      existing.status = status;
      return this.attendanceRepository.save(existing);
    }

    const attendance = this.attendanceRepository.create({
      lesson_id: lessonId,
      student_id: studentId,
      status,
      confirmed: false,
      justified: false,
    });

    return this.attendanceRepository.save(attendance);
  }

  async confirmAttendance(id: number): Promise<Attendance> {
    const attendance = await this.findOne(id);
    attendance.confirmed = true;
    return this.attendanceRepository.save(attendance);
  }
}
