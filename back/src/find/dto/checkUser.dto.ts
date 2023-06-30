import { Repository } from 'typeorm';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';
import { CertificateEmailDto } from './certificate.dto';

export class CheckUserDto extends CertificateEmailDto {

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[a-zA-Z])(?=.*[0-9]).{4,24}$/, {
    message: '아이디를 확인해주세요.',
  })
  userId: string;

}
