import { Controller, Post, Get, Param, Patch, Delete, Body } from '@nestjs/common';
import { ProfessorsService } from './professors.service';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { UsersService } from '../users/users.service';

@Controller('professors')
export class ProfessorsController {
  constructor(
    private professorsService: ProfessorsService,
    private usersService: UsersService,
  ) {}

  @Post()
  async create(@Body() dto: CreateProfessorDto) {
    const user = await this.usersService.findOne(dto.userId);
    return this.professorsService.create(dto, user);
  }

  @Get()
  findAll() {
    return this.professorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.professorsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateProfessorDto) {
    return this.professorsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.professorsService.remove(id);
  }
}
