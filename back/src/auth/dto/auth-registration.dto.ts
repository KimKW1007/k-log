import { Repository } from 'typeorm';
import { User } from '../user.entity';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { AuthCredentialsDto } from './auth-credentials.dto';

export class AuthRegistrationDto extends AuthCredentialsDto {
  
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  userEmail: string;

}
