import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { Student } from './entities/student.entity';
import { UsersModule } from '../users/users.module';
import { AttendancesModule } from 'src/attendances/attendances.module';

@Module({
  imports: [TypeOrmModule.forFeature([Student]), UsersModule, AttendancesModule],
  providers: [StudentsService],
  controllers: [StudentsController],
  exports: [StudentsService],
})
export class StudentsModule {}
