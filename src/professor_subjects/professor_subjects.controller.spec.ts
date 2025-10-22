import { Test, TestingModule } from '@nestjs/testing';
import { ProfessorSubjectsController } from './professor_subjects.controller';
import { ProfessorSubjectsService } from './professor_subjects.service';

describe('ProfessorSubjectsController', () => {
  let controller: ProfessorSubjectsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfessorSubjectsController],
      providers: [ProfessorSubjectsService],
    }).compile();

    controller = module.get<ProfessorSubjectsController>(ProfessorSubjectsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
