import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProfessorDto {
  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}
