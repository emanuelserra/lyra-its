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
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('professors')
export class ProfessorsController {
  constructor(private readonly professorsService: ProfessorsService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  create(@Body() createDto: CreateProfessorDto) {
    return this.professorsService.create(createDto);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.professorsService.findAll();
  }

  @Get('me')
  @Roles(UserRole.PROFESSOR)
  getMyProfile(@CurrentUser() user: User) {
    return this.professorsService.findByUserId(user.id);
  }

  @Get('me/lessons')
  @Roles(UserRole.PROFESSOR)
  getMyLessons(@CurrentUser() user: User) {
    return this.professorsService.getLessons(user.id);
  }

  @Get('me/subjects')
  @Roles(UserRole.PROFESSOR)
  getMySubjects(@CurrentUser() user: User) {
    return this.professorsService.getSubjects(user.id);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.PROFESSOR)
  findOne(@Param('id') id: string) {
    return this.professorsService.findOne(+id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() updateDto: UpdateProfessorDto) {
    return this.professorsService.update(+id, updateDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.professorsService.remove(+id);
  }

  @Post(':id/courses/:courseId')
  @Roles(UserRole.ADMIN)
  assignCourse(
    @Param('id') id: string,
    @Param('courseId') courseId: string,
  ) {
    return this.professorsService.assignCourse(+id, +courseId);
  }

  @Delete(':id/courses/:courseId')
  @Roles(UserRole.ADMIN)
  removeCourse(
    @Param('id') id: string,
    @Param('courseId') courseId: string,
  ) {
    return this.professorsService.removeCourse(+id, +courseId);
  }
}
