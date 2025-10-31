import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ForbiddenException,
} from '@nestjs/common';
import { AttendancesService } from './attendances.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('attendances')
export class AttendancesController {
  constructor(private readonly attendancesService: AttendancesService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.PROFESSOR, UserRole.TUTOR)
  create(@Body() createDto: CreateAttendanceDto) {
    return this.attendancesService.create(createDto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.PROFESSOR, UserRole.TUTOR)
  findAll() {
    return this.attendancesService.findAll();
  }

  @Get('lesson/:lessonId')
  @Roles(UserRole.ADMIN, UserRole.PROFESSOR, UserRole.TUTOR)
  findByLesson(@Param('lessonId') lessonId: string) {
    return this.attendancesService.findByLesson(+lessonId);
  }

  @Get('student/:studentId')
  @Roles(UserRole.ADMIN, UserRole.PROFESSOR, UserRole.TUTOR, UserRole.STUDENT)
  async findByStudent(
    @Param('studentId') studentId: string,
    @CurrentUser() user: User,
  ) {
    if (user.role === UserRole.STUDENT && user.student?.id !== +studentId) {
      throw new ForbiddenException('You can only view your own attendances');
    }
    return this.attendancesService.findByStudent(+studentId);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.PROFESSOR, UserRole.TUTOR)
  findOne(@Param('id') id: string) {
    return this.attendancesService.findOne(+id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.PROFESSOR, UserRole.TUTOR)
  update(@Param('id') id: string, @Body() updateDto: UpdateAttendanceDto) {
    return this.attendancesService.update(+id, updateDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.attendancesService.remove(+id);
  }
}
