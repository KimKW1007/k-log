import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class CategoryRepository extends Repository<Category> {
  constructor(private dataSource: DataSource) {
    super(Category, dataSource.createEntityManager());
  }

  async createCategory(createCategoryDto: CreateCategoryDto, user: User) :Promise<{message: string}> {
    const { categoryTopTitle, categoryTitle } = createCategoryDto;
    console.log({user})
    if(user.id > 1) throw new ConflictException('관리자만 생성 할 수 있습니다.'); 
    const category = this.create({
      categoryTopTitle,
      categoryTitle,
      user
    });
    await this.save(category);
    return { message: '카테고리가 생성 되었습니다.' };
    
  }
}
