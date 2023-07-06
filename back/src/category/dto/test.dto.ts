import { Repository } from 'typeorm';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { Category } from '../category.entity';
import { SubCategory } from '../subCategory.entity';

export class TestDto extends Repository<Category> {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  categoryTitle: string;

  @IsNotEmpty()
  subCategories: SubCategory[];
}
