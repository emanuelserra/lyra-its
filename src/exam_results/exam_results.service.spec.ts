import { Test, TestingModule } from '@nestjs/testing';
import { ExamResultsService } from './exam_results.service';

describe('ExamResultsService', () => {
  let service: ExamResultsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExamResultsService],
    }).compile();

    service = module.get<ExamResultsService>(ExamResultsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
