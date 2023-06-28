import { Repository } from 'typeorm';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';
import { FindId } from '../findId.entity';

export class FindIdDto extends Repository<FindId> {

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  userEmail: string;

  @IsNotEmpty()
  @IsString()
  token : string;
  
}
