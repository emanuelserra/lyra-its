import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async findAll(): Promise<Student[]> {
    return this.studentRepository.find({
      relations: ['user', 'course', 'attendances', 'examResults'],
    });
  }

  async findOne(id: number): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { id },
      relations: ['user', 'course', 'attendances', 'examResults'],
    });

    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    return student;
  }

  async create(createDto: CreateStudentDto): Promise<Student> {
    const student = this.studentRepository.create(createDto);
    return this.studentRepository.save(student);
  }

  async update(id: number, updateDto: UpdateStudentDto): Promise<Student> {
    const student = await this.findOne(id);
    Object.assign(student, updateDto);
    return this.studentRepository.save(student);
  }

  async remove(id: number): Promise<void> {
    const student = await this.findOne(id);
    await this.studentRepository.remove(student);
  }

  async findByUserId(userId: number): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { user_id: userId },
      relations: ['user', 'course', 'attendances', 'examResults'],
    });

    if (!student) {
      throw new NotFoundException(
        `Student with user ID ${userId} not found`,
      );
    }

    return student;
  }

  async getAttendances(userId: number): Promise<any[]> {
    const student = await this.findByUserId(userId);
    return this.studentRepository.find({
      where: { id: student.id },
      relations: ['attendances', 'attendances.lesson', 'attendances.lesson.subject'],
      select: ['attendances'],
    }).then(s => s[0]?.attendances || []);
  }

  async getGrades(userId: number): Promise<any[]> {
    const student = await this.findByUserId(userId);
    return this.studentRepository.find({
      where: { id: student.id },
      relations: ['examResults', 'examResults.examSession', 'examResults.examSession.subject'],
      select: ['examResults'],
    }).then(s => s[0]?.examResults || []);
  }
}
