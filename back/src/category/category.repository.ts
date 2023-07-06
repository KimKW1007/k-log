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
import { TestDto } from './dto/test.dto';

@Injectable()
export class SubCategoryRepository extends Repository<SubCategory> {
  constructor(private dataSource: DataSource) {
    super(SubCategory, dataSource.createEntityManager());
  }

  /*   async createSubCategory(createSubCategoryDto : CreateSubCategoryDto, category: Category, user: User) :Promise<{message: string}> {
    const { categoryTitle, categorySubTitle } = createSubCategoryDto;
    const found = await this.categoryRepository.findOneBy({categoryTitle})
    const result = await this.findOneBy({category:{id: found.id}, categorySubTitle})
    if(result) throw new ConflictException('이미 생성된 카테고리입니다.'); 
    if(user.id > 1) throw new ConflictException('관리자만 생성 할 수 있습니다.'); 
    const subCategory = this.create({
    categorySubTitle,
    category : found
    });
    console.log(subCategory)
    await this.save(subCategory);
    return { message: '카테고리가 생성 되었습니다.' };
    
  } */
}

@Injectable()
export class CategoryRepository extends Repository<Category> {
  constructor(
    private dataSource: DataSource,
    private subCategoryRepository: SubCategoryRepository,
  ) {
    super(Category, dataSource.createEntityManager());
  }

  // create 초기안
  /*  async createCategory(createCategoryDto: CreateCategoryDto, user: User)  {
    const { categoryTitle } = createCategoryDto;
    const found = await this.findOneBy({categoryTitle})
    console.log({user})
    if(found) throw new ConflictException('이미 생성된 카테고리입니다.'); 
    if(user.id > 1) throw new ConflictException('관리자만 생성 할 수 있습니다.'); 
    const category = this.create({
      categoryTitle,
      user
    });
    await this.save(category);
    return { message: '카테고리가 생성 되었습니다.' }; 
    }*/
  // =================================================================================
 
}
