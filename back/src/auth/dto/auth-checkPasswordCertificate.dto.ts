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

export class AuthPasswordCertificateDto extends Repository<User> {

  @IsNotEmpty()
  @IsString()
  // 영어랑 숫자만 가능한 유효성 체크
  @Matches(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,}$/, {
    message: '비밀번호를 확인해주세요.',
  })
  password : string;
}
