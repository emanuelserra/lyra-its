import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsDateString,
  IsEnum,
  Length,
} from 'class-validator';
import { UserRole } from '../../common/enums/user-role.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  last_name: string;

  @IsEmail()
  @IsNotEmpty()
  @Length(1, 70)
  email: string;

  @IsString()
  @IsNotEmpty()
  password_hash: string;

  @IsDateString()
  birth_date?: Date;

  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  phone: string;

  @IsEnum(UserRole)
  role: UserRole;
}
