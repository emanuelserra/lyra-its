import { IsInt, IsOptional, IsString, IsIn } from 'class-validator';

export class CreateStudentDto {
  @IsOptional()
  @IsInt()
  enrollment_number?: string | null;

  @IsOptional()
  @IsInt()
  enrollment_year?: number | null;

//   @IsOptional()
//   @IsString()
//   status?: string;


  @IsOptional()
  @IsIn (['active','graduated','retired'])
  status?: 'active' | 'graduated' | 'retired';

  // se vuoi passare userId direttamente:
  @IsInt()
  userId: number;
}

