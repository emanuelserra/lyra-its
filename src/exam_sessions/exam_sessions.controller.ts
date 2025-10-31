import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExamSessionsService } from './exam_sessions.service';
import { CreateExamSessionDto } from './dto/create-exam_session.dto';
import { UpdateExamSessionDto } from './dto/update-exam_session.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';

@Controller('exam-sessions')
export class ExamSessionsController {
  constructor(private readonly examSessionsService: ExamSessionsService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.PROFESSOR)
  create(@Body() createDto: CreateExamSessionDto) {
    return this.examSessionsService.create(createDto);
  }

  @Get()
  findAll() {
    return this.examSessionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examSessionsService.findOne(+id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.PROFESSOR)
  update(@Param('id') id: string, @Body() updateDto: UpdateExamSessionDto) {
    return this.examSessionsService.update(+id, updateDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.examSessionsService.remove(+id);
  }
}
