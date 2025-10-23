import { Test, TestingModule } from '@nestjs/testing';
import { ExamResultsController } from './exam_results.controller';
import { ExamResultsService } from './exam_results.service';

describe('ExamResultsController', () => {
  let controller: ExamResultsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExamResultsController],
      providers: [ExamResultsService],
    }).compile();

    controller = module.get<ExamResultsController>(ExamResultsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
