
import { Controller, Get, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { GradesReportFilterDto } from './dto/grades-report-filter.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

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
}
