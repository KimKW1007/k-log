import { Repository } from 'typeorm';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';
import { CreateCategoryDto } from './createCategory.dto';
import { SubCategory } from '../subCategory.entity';

export class CreateSubCategoryDto extends CreateCategoryDto {

  @IsNotEmpty()
  @IsString()
  categorySubTitle: string;

  
}
