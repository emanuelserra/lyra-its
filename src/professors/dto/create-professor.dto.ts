import { IsInt, IsString, Length } from 'class-validator'; 

export class CreateProfessorDto {
  @IsInt()
  userId: number;   // l'ID dell'utente già esistente

  @IsString()
  @Length(1, 150)
  subject: string;
}

