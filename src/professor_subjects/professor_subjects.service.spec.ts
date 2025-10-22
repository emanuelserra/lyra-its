import { Test, TestingModule } from '@nestjs/testing';
import { ProfessorSubjectsService } from './professor_subjects.service';

describe('ProfessorSubjectsService', () => {
  let service: ProfessorSubjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfessorSubjectsService],
    }).compile();

    service = module.get<ProfessorSubjectsService>(ProfessorSubjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
