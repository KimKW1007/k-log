import { Repository } from 'typeorm';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';
import { SendEmaildDto } from './sendEmail.dto';

export class CertificateEmailDto extends SendEmaildDto {

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  userEmail: string;

  @IsNotEmpty()
  @IsString()
  token : string;
  
}
