import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { User } from 'src/auth/user.entity';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
  ) {}

  createCategory(
    createCategoryDto: CreateCategoryDto,
    user: User,
  ): Promise<{message: string}> {
    return this.categoryRepository.createCategory(createCategoryDto, user);
  }

  async getAllCategory(): Promise<Category[]> {
    return await this.categoryRepository.find({
      where: { user: { id: 1 } },
    });
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
    const {categoryTopTitle, categoryTitle} = createCategoryDto;
    if (user.id > 1)
      throw new ConflictException('관리자만 수정 할 수 있습니다.');
    const category = await this.categoryRepository.findOneBy({id})
    category.categoryTitle = categoryTitle;
    category.categoryTopTitle = categoryTopTitle;

    await this.categoryRepository.save(category)
    return { message: '카테고리가 수정 되었습니다.' };
  }
}
