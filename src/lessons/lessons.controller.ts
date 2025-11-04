import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.PROFESSOR)
  create(@Body() createDto: CreateLessonDto) {
    return this.lessonsService.create(createDto);
  }

  @Get()
  async findAll(
    @Query('professorId') professorId?: string,
    @Query('courseId') courseId?: string,
    @CurrentUser() user?: User,
  ) {
    if (professorId) {
      return this.lessonsService.findByProfessor(+professorId);
    }

    if (courseId) {
      return this.lessonsService.findByCourse(+courseId);
    }

    if (user?.role === UserRole.PROFESSOR && user.professor) {
      return this.lessonsService.findByProfessorSubjects(user.professor.id);
    }

    if (user?.role === UserRole.STUDENT && user.student?.course_id) {
      return this.lessonsService.findByCourse(user.student.course_id);
    }

    return this.lessonsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonsService.findOne(+id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.PROFESSOR)
  update(@Param('id') id: string, @Body() updateDto: UpdateLessonDto) {
    return this.lessonsService.update(+id, updateDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.lessonsService.remove(+id);
  }
}
