import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProfessorsService } from './professors.service';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';

@Controller('professors')
export class ProfessorsController {
  constructor(private readonly professorsService: ProfessorsService) {}

  @Get()
  findAll() {
    return this.professorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.professorsService.findOne(+id);
  }

  @Post()
  create(@Body() createDto: CreateProfessorDto) {
    return this.professorsService.create(createDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateProfessorDto) {
    return this.professorsService.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.professorsService.remove(+id);
  }
}
