import { Repository } from 'typeorm';
import { User } from '../user.entity';
import {
  IsEmail,
  IsNotEmpty,
  IsString,

} from 'class-validator';

export class AuthCheckEmailDto extends Repository<User> {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  userEmail: string;
  
}
