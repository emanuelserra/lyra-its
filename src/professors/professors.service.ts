import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Professor } from './entities/professor.entity';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';

@Injectable()
export class ProfessorsService {
  constructor(
    @InjectRepository(Professor)
    private professorRepository: Repository<Professor>,
  ) {}

  async findAll(): Promise<Professor[]> {
    return this.professorRepository.find({
      relations: ['user', 'subjects', 'courses', 'lessons', 'examSessions'],
    });
  }

  async findOne(id: number): Promise<Professor> {
    const professor = await this.professorRepository.findOne({
      where: { id },
      relations: ['user', 'subjects', 'courses', 'lessons', 'examSessions'],
    });

    if (!professor) {
      throw new NotFoundException(`Professor with ID ${id} not found`);
    }

    return professor;
  }

  async create(createDto: CreateProfessorDto): Promise<Professor> {
    const professor = this.professorRepository.create(createDto);
    return this.professorRepository.save(professor);
  }

  async update(id: number, updateDto: UpdateProfessorDto): Promise<Professor> {
    const professor = await this.findOne(id);
    Object.assign(professor, updateDto);
    return this.professorRepository.save(professor);
  }

  async remove(id: number): Promise<void> {
    const professor = await this.findOne(id);
    await this.professorRepository.remove(professor);
  }

  async findByUserId(userId: number): Promise<Professor> {
    const professor = await this.professorRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user', 'subjects', 'courses', 'lessons', 'examSessions'],
    });

    if (!professor) {
      throw new NotFoundException(
        `Professor with user ID ${userId} not found`,
      );
    }

    return professor;
  }

  async getLessons(userId: number): Promise<any[]> {
    const professor = await this.findByUserId(userId);
    return professor.lessons || [];
  }

  async getSubjects(userId: number): Promise<any[]> {
    const professor = await this.findByUserId(userId);
    return professor.subjects || [];
  }
}
