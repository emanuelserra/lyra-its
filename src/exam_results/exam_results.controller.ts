import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ForbiddenException,
  Query,
} from '@nestjs/common';
import { ExamResultsService } from './exam_results.service';
import { CreateExamResultDto } from './dto/create-exam_result.dto';
import { UpdateExamResultDto } from './dto/update-exam_result.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('exam-results')
export class ExamResultsController {
  constructor(private readonly examResultsService: ExamResultsService) {}

  // creato da professore/tutor/admin
  @Post()
  @Roles(UserRole.ADMIN, UserRole.PROFESSOR, UserRole.TUTOR)
  create(@Body() createDto: CreateExamResultDto) {
    return this.examResultsService.create(createDto);
  }

  // elenco (opzionale status=pending)
  @Get()
  @Roles(UserRole.ADMIN, UserRole.PROFESSOR, UserRole.TUTOR)
  findAll(@Query('status') status?: string) {
    return this.examResultsService.findAll(status);
  }

  // studente vede solo i suoi risultati
  @Get('student/:studentId')
  @Roles(UserRole.ADMIN, UserRole.PROFESSOR, UserRole.TUTOR, UserRole.STUDENT)
  async findByStudent(
    @Param('studentId') studentId: string,
    @CurrentUser() user: User,
  ) {
    if (user.role === UserRole.STUDENT && user.student?.id !== +studentId) {
      throw new ForbiddenException('You can only view your own exam results');
    }
    return this.examResultsService.findByStudent(+studentId);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.PROFESSOR, UserRole.TUTOR)
  findOne(@Param('id') id: string) {
    return this.examResultsService.findOne(+id);
  }

  // PATCH per aggiornare voto, status, ecc.
  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.PROFESSOR, UserRole.TUTOR)
  update(@Param('id') id: string, @Body() updateDto: UpdateExamResultDto) {
    return this.examResultsService.update(+id, updateDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.examResultsService.remove(+id);
  }
}
