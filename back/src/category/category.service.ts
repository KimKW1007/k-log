import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoryRepository, SubCategoryRepository } from './category.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { User } from 'src/auth/user.entity';
import { Category } from './category.entity';
import { CreateSubCategoryDto } from './dto/createSubCategory.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
    private subCategoryRepository: SubCategoryRepository,
  ) {}

  createCategory(
    createCategoryDto: CreateCategoryDto,
    user: User,
  ): Promise<{ message: string }> {
    return this.categoryRepository.createCategory(createCategoryDto, user);
  }
  createSubCategory(
    createSubCategoryDto : CreateSubCategoryDto,
    category: Category, user: User
  ): Promise<{ message: string }> {
    return this.subCategoryRepository.createSubCategory(createSubCategoryDto,  category, user);
  }

  async getAllCategory(): Promise<Category[]> {
    const category = await this.categoryRepository.find({
      where: { user: { id: 1 } },
    });
    return category;
  }

  async deleteCategory(id: number, user: User): Promise<{ message: string }> {
    if (user.id > 1)
      throw new ConflictException('관리자만 삭제 할 수 있습니다.');
    const result = await this.categoryRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    return { message: '카테고리가 삭제 되었습니다.' };
  }

  async updateTitles(
    id: number,
    createCategoryDto: CreateCategoryDto,
    user: User,
  ): Promise<{ message: string }> {
    const { categoryTitle } = createCategoryDto;
    if (user.id > 1)
      throw new ConflictException('관리자만 수정 할 수 있습니다.');
    const category = await this.categoryRepository.findOneBy({ id });
    category.categoryTitle = categoryTitle;

    await this.categoryRepository.save(category);
    return { message: '카테고리가 수정 되었습니다.' };
  }
}
