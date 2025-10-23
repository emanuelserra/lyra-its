import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExamResultsService } from './exam_results.service';
import { CreateExamResultDto } from './dto/create-exam_result.dto';
import { UpdateExamResultDto } from './dto/update-exam_result.dto';

@Controller('exam-results')
export class ExamResultsController {
  constructor(private readonly examResultsService: ExamResultsService) {}

  @Get()
  findAll() {
    return this.examResultsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examResultsService.findOne(+id);
  }

  @Post()
  create(@Body() createDto: CreateExamResultDto) {
    return this.examResultsService.create(createDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateExamResultDto) {
    return this.examResultsService.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.examResultsService.remove(+id);
  }
}
