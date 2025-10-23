import { Test, TestingModule } from '@nestjs/testing';
import { ExamSessionsService } from './exam_sessions.service';

describe('ExamSessionsService', () => {
  let service: ExamSessionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExamSessionsService],
    }).compile();

    service = module.get<ExamSessionsService>(ExamSessionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
