import { Repository } from 'typeorm';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';
import { Category } from '../category.entity';

export class CreateCategoryDto extends Repository<Category> {

  @IsNotEmpty()
  @IsString()
  categoryTitle: string;

  
}
