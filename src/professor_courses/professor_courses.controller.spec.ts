import { Test, TestingModule } from '@nestjs/testing';
import { ProfessorCoursesController } from './professor_courses.controller';
import { ProfessorCoursesService } from './professor_courses.service';

describe('ProfessorCoursesController', () => {
  let controller: ProfessorCoursesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfessorCoursesController],
      providers: [ProfessorCoursesService],
    }).compile();

    controller = module.get<ProfessorCoursesController>(ProfessorCoursesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
