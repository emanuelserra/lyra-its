import {
  Controller,
<<<<<<< HEAD
  Post,
  Get,
  Patch,
  Param,
  Body
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson } from './entities/lesson.entity';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) { }

  @Post()
  create(@Body() dto: CreateLessonDto): Promise<Lesson> {
    return this.lessonsService.create(dto);
  }

  @Get()
  findAll(): Promise<Lesson[]> {
=======
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post()
  create(@Body() dto: CreateLessonDto) {
    return this.lessonsService.create(dto);
  }
/*
  @Get()
  findAll() {
>>>>>>> 6d8a6cdaa944bec159f4970e52deef194a5c9eee
    return this.lessonsService.findAll();
  }

  @Get(':id')
<<<<<<< HEAD
  findOne(@Param('id') id: string): Promise<Lesson> {
    return this.lessonsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateLessonDto): Promise<Lesson> {
    return this.lessonsService.update(+id, dto);
  }
}
=======
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.lessonsService.findOne(id);
  }

  /*@Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateLessonDto) {
    return this.lessonsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    this.lessonsService.remove(id);
    return { message: `Lesson with id ${id} deleted` };
  }
*/
}

>>>>>>> 6d8a6cdaa944bec159f4970e52deef194a5c9eee
