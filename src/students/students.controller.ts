import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { ResourceOwnerGuard } from '../auth/guards/resource-owner.guard';
import { AttendancesService } from 'src/attendances/attendances.service';

@Controller('students')
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly attendancesService: AttendancesService, 
  ) {}

  @Post()
  @Roles(UserRole.ADMIN)
  create(@Body() createDto: CreateStudentDto) {
    return this.studentsService.create(createDto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.PROFESSOR, UserRole.TUTOR)
  findAll() {
    return this.studentsService.findAll();
  }

  @Get('me')
  @Roles(UserRole.STUDENT)
  getMyProfile(@CurrentUser() user: User) {
    return this.studentsService.findByUserId(user.id);
  }

  
  @Get('me/attendance')
  @Roles(UserRole.STUDENT)
  async myAttendance(@CurrentUser() user: User) {
    const studentId = user.student?.id;
    if (!studentId) return [];

    const rows = await this.attendancesService.findByStudent(studentId);

    return rows.map((a) => ({
      id: a.id,
      lesson_date: a.lesson?.lesson_date ?? null,
      lesson_start_time: a.lesson?.start_time ?? null,
      lesson_end_time: a.lesson?.end_time ?? null,
      course_name: a.lesson?.course?.name ?? null,
      subject_name: a.lesson?.subject?.name ?? null,
      status: a.status,
    }));
  }

  @Get('me/grades')
  @Roles(UserRole.STUDENT)
  getMyGrades(@CurrentUser() user: User) {
    return this.studentsService.getGrades(user.id);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.PROFESSOR, UserRole.TUTOR, UserRole.STUDENT)
  @UseGuards(ResourceOwnerGuard)
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(+id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() updateDto: UpdateStudentDto) {
    return this.studentsService.update(+id, updateDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }
}
