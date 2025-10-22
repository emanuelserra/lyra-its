import { Test, TestingModule } from '@nestjs/testing';
import { ProfessorCoursesService } from './professor_courses.service';

describe('ProfessorCoursesService', () => {
  let service: ProfessorCoursesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfessorCoursesService],
    }).compile();

    service = module.get<ProfessorCoursesService>(ProfessorCoursesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
