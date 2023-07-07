import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { User } from 'src/auth/user.entity';
import { CreateSubCategoryDto } from './dto/createSubCategory.dto';
import { SubCategory } from './subCategory.entity';

@Injectable()
export class SubCategoryRepository extends Repository<SubCategory> {
  constructor(private dataSource: DataSource) {
    super(SubCategory, dataSource.createEntityManager());
  }
  
}

@Injectable()
export class CategoryRepository extends Repository<Category> {
  constructor(
    private dataSource: DataSource,
    private subCategoryRepository: SubCategoryRepository,
  ) {
    super(Category, dataSource.createEntityManager());
  }

  
}
