import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Professor } from './entities/professor.entity';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { User } from '../users/entities/users.entity';

@Injectable()
export class ProfessorsService {
  constructor(
    @InjectRepository(Professor) private repo: Repository<Professor>,
  ) {}

  async create(dto: CreateProfessorDto, user: User) {
    const prof = this.repo.create({
      user_id: dto.userId,
      user,
      subject: dto.subject,
    });
    return this.repo.save(prof);
  }

  findAll() {
    return this.repo.find({ relations: ['user'] });
  }

  async findOne(userId: number) {
    const prof = await this.repo.findOne({
      where: { user_id: userId },
      relations: ['user'],
    });
    if (!prof) throw new NotFoundException('Professor not found');
    return prof;
  }

  async update(userId: number, dto: UpdateProfessorDto) {
    const prof = await this.findOne(userId);
    Object.assign(prof, dto);
    return this.repo.save(prof);
  }

  async remove(userId: number) {
    const prof = await this.findOne(userId);
    return this.repo.remove(prof);
  }
}
