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

export class AuthChangeThingsDto extends Repository<User> {
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[a-zA-Z])(?=.*[0-9]).{4,24}$/, {
    message: '아이디를 확인해주세요.',
  })
  userId ?: string;
  
  @IsNotEmpty()
  @IsString()
  userName ?: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  userEmail ?: string;
}
