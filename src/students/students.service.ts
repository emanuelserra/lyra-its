import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/users.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student) private repo: Repository<Student>,
    private usersService: UsersService,
  ) {}


  //Crea uno student associato a un user esistente.
  
  async create(dto: CreateStudentDto) {
    // verifica esistenza user
    const user: User = await this.usersService.findOne(dto.userId);
    if (!user) throw new NotFoundException('User not found');

    // create accetta DeepPartial<Student>; 
    const student = new Student();
  student.user_id = dto.userId;
  student.user = user;
  student.enrollment_number = dto.enrollment_number ?? null;
  student.enrollment_year = dto.enrollment_year ?? null;
  student.status = dto.status ?? 'active';

  return this.repo.save(student);
  }

  /** Restituisce tutti gli studenti con la relazione user */
  findAll() {
    return this.repo.find({ relations: ['user'] });
  }

  /** Cerca uno student per user_id (PK) */
  async findOne(userId: number) {
    const s = await this.repo.findOne({
      where: { user_id: userId },   // <-- user_id, non `id`
      relations: ['user'],
    });
    if (!s) throw new NotFoundException('Student not found');
    return s;
  }

  /** Aggiorna uno student (user_id è PK) */
  async update(userId: number, dto: UpdateStudentDto) {
    const s = await this.findOne(userId);
    // copiamo solo i campi ammessi
    if (dto.enrollment_number !== undefined) s.enrollment_number = dto.enrollment_number;
    if (dto.enrollment_year !== undefined) s.enrollment_year = dto.enrollment_year;
    if (dto.status !== undefined) s.status = dto.status;

    return this.repo.save(s);
  }

  /** Cancella lo student (di solito si cancella l'user che provoca cascade) */
  async remove(userId: number) {
    const s = await this.findOne(userId);
    return this.repo.remove(s);
  }
}
