import { Repository } from 'typeorm';
import { User } from '../user.entity';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthCredentialsDto extends Repository<User> {
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[a-zA-Z])(?=.*[0-9]).{4,24}$/, {
    message: '아이디를 확인해주세요.',
  })
  userId: string;
  
  @IsNotEmpty()
  @IsString()
  // 영어랑 숫자만 가능한 유효성 체크
  @Matches(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,}$/, {
    message: '비밀번호를 확인해주세요.',
  })
  password: string;
}
