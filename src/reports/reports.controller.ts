import { Controller, Get, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { GradesReportFilterDto } from './dto/grades-report-filter.dto';
import { AttendanceReportFilterDto } from './dto/attendance-report-filter.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) { }

  /**
   * GET /reports/grades
   *
   * Esempi:
   *  - /reports/grades?course_id=1
   *  - /reports/grades?course_id=1&subject_id=3
   *  - /reports/grades?student_id=10
   *  - /reports/grades?from_date=2025-01-01&to_date=2025-03-31
   *  - /reports/grades?status=confirmed
   */
  @Get('grades')
  @Roles(UserRole.ADMIN, UserRole.PROFESSOR, UserRole.TUTOR)
  getGradesReport(@Query() filters: GradesReportFilterDto) {
    return this.reportsService.getGradesReport(filters);
  }

  /**
   * GET /reports/attendance
   *
   * Esempi:
   *  - /reports/attendance?course_id=1
   *  - /reports/attendance?course_id=1&subject_id=3
   *  - /reports/attendance?student_id=10
   *  - /reports/attendance?from_date=2025-01-01&to_date=2025-03-31
   *  - /reports/attendance?status=absent
   *  - /reports/attendance?status=absent&justified=true
   */
  @Get('attendance')
  @Roles(UserRole.ADMIN, UserRole.PROFESSOR, UserRole.TUTOR)
  getAttendanceReport(@Query() filters: AttendanceReportFilterDto) {
    return this.reportsService.getAttendanceReport(filters);
  }
}