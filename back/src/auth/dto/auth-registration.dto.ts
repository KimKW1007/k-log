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

export class AuthRegistrationDto extends Repository<User> {
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[a-zA-Z])(?=.*[0-9]).{4,24}$/, {
    message: '아이디 형식을 확인해주세요.',
  })
  userId: string;
  
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  userEmail: string;
  
  @IsNotEmpty()
  @IsString()
  // 영어랑 숫자만 가능한 유효성 체크
  @Matches(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,}$/, {
    message: '비밀번호 형식을 확인해주세요.',
  })
  password: string;
}
