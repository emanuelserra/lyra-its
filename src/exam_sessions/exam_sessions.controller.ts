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

@Controller('exam-sessions')
export class ExamSessionsController {
  constructor(private readonly examSessionsService: ExamSessionsService) {}

  @Get()
  findAll() {
    return this.examSessionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examSessionsService.findOne(+id);
  }

  @Post()
  create(@Body() createDto: CreateExamSessionDto) {
    return this.examSessionsService.create(createDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateExamSessionDto) {
    return this.examSessionsService.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.examSessionsService.remove(+id);
  }
}
