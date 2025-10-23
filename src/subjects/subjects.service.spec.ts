import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from './entities/subject.entity';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private subjectRepo: Repository<Subject>,
  ) {}

  findAll() {
    return this.subjectRepo.find();
  }

  async findOne(id: number) {
    const subject = await this.subjectRepo.findOne({ where: { id } });
    if (!subject) throw new NotFoundException('Subject not found');
    return subject;
  }

  create(dto: CreateSubjectDto) {
    const subject = this.subjectRepo.create(dto);
    return this.subjectRepo.save(subject);
  }

  async update(id: number, dto: UpdateSubjectDto) {
    const subject = await this.findOne(id);
    Object.assign(subject, dto);
    return this.subjectRepo.save(subject);
  }

  async remove(id: number) {
    const subject = await this.findOne(id);
    return this.subjectRepo.remove(subject);
  }
}
