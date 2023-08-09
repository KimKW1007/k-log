import { Repository } from 'typeorm';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';
import { Project } from '../project.entity';

export class CreateProjectDto extends Repository<Project> {

  @IsNotEmpty()
  @IsString()
  title: string;
  
  @IsNotEmpty()
  @IsString()
  link: string;
  
}
