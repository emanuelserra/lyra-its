import { PartialType } from '@nestjs/mapped-types';
import { CreateExamResultDto } from './create-exam_result.dto';
import { IsIn, IsOptional } from 'class-validator';

export class UpdateExamResultDto extends PartialType(CreateExamResultDto) {
  @IsOptional()
  @IsIn(['pending', 'confirmed', 'rejected'])
  status?: 'pending' | 'confirmed' | 'rejected';
}
