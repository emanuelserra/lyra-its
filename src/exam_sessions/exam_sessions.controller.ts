import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExamSessionsService } from './exam_sessions.service';
import { CreateExamSessionDto } from './dto/create-exam_session.dto';
import { UpdateExamSessionDto } from './dto/update-exam_session.dto';

@Controller('exam_sessions')
export class ExamSessionsController {
  constructor(private readonly examSessionsService: ExamSessionsService) {}

  @Post()
  create(@Body() createExamSessionDto: CreateExamSessionDto) {
    return this.examSessionsService.create(createExamSessionDto);
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
  update(@Param('id') id: string, @Body() updateExamSessionDto: UpdateExamSessionDto) {
    return this.examSessionsService.update(+id, updateExamSessionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.examSessionsService.remove(+id);
  }
}
