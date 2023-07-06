import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CategoryRepository,
  SubCategoryRepository,
} from './category.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { User } from 'src/auth/user.entity';
import { Category } from './category.entity';
import { CreateSubCategoryDto } from './dto/createSubCategory.dto';
import { TestDto } from './dto/test.dto';
import { Not } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
    private subCategoryRepository: SubCategoryRepository,
  ) {}

  async getAllCategory(): Promise<Category[]> {
    const category = await this.categoryRepository.find({
      where: { user: { id: 1 } },
    });
    return category;
  }

  async deleteCategory(id: number, user: User): Promise<{ message: string }> {
    if (user.id > 1)
      throw new ConflictException('관리자만 삭제 할 수 있습니다.');
    const subCategoryResult = await this.subCategoryRepository.delete({
      category: { id },
    });
    const result = await this.categoryRepository.delete({ id });
    if (result.affected === 0 || subCategoryResult.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    return { message: '카테고리가 삭제 되었습니다.' };
  }
  async deletesSubCategory(
    id: number,
    user: User,
  ): Promise<{ message: string }> {
    if (user.id > 1)
      throw new ConflictException('관리자만 삭제 할 수 있습니다.');
    const result = await this.subCategoryRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    return { message: '카테고리가 삭제 되었습니다.' };
  }

  async updateTitles(testDto: Category[], user: User): Promise<void> {
    if (user.id > 1) throw new ConflictException('관리자 권한이 없습니다.');
    const foundCategory = await this.categoryRepository.find({
      where: { user: { id: user.id } },
    });



    // client 에서 받은 arr 중복값 확인
    const testMap = testDto.map((ele) => ele.categoryTitle);
    const chackSameCategoryTitle = testMap.some(
      (x, i) => testMap.indexOf(x) !== i,
    );
    if (chackSameCategoryTitle)
      throw new ConflictException(
        `중복된 카테고리가 있습니다. 값을 확인해주세요.`,
      );

     /*  const check = testDto.filter(x => foundCategory.filter(i => x.id === i.id && x.categoryTitle === i.categoryTitle && x.subCategories.filter(y=> i.subCategories.filter(z=> y === z))))
      if(foundCategory === testDto) throw new ConflictException(
        `이전 값과 동일하여 변경되지 않습니다.`,
      ); 
      console.log({check}) */

    // client 에서 받은  arr와 database arr 중복확인(categoryTitle)
    const filteredCategory = testDto.filter(
      (x) => !foundCategory.some((i) => i.categoryTitle === x.categoryTitle),
    );
    // client 에서 받은  arr와 database arr 중복확인(subCategories.length)
    const filteredSubCategory = testDto.filter(
      (x) =>
        !foundCategory.some(
          (i) => i.subCategories.length === x.subCategories.length,
        ),
    );
    //create categoryTitle or all
    if (foundCategory.length < testDto.length) {
      filteredCategory.map(async ({ id, categoryTitle, subCategories }) => {
        const checkCategory = foundCategory.find(
          (x) => x.categoryTitle === categoryTitle,
        );
        if (checkCategory)
          throw new ConflictException(
            `${categoryTitle}은(는) 중복된 카테고리 입니다.`,
          );
        const newCategory = this.categoryRepository.create({
          categoryTitle,
          user,
        });
        await this.categoryRepository.save(newCategory).then((res) => {
          if (subCategories.length < 1) return;
          subCategories.map(async ({ id, categorySubTitle }) => {
            const newSubCategory = this.subCategoryRepository.create({
              categorySubTitle,
              category: res,
            });
            await this.subCategoryRepository.save(newSubCategory);
          });
        });
      });
    }
    // create SubCategory
    if (foundCategory.length === testDto.length && foundCategory.length >= 1) {
      filteredSubCategory.map(async (ele) => {
        const category = await this.categoryRepository.findOneBy({
          categoryTitle: ele.categoryTitle,
        });
        const filteredCategory = await this.subCategoryRepository.find({
          where: { category: { categoryTitle: ele.categoryTitle } },
        });
        const secondFilter = ele.subCategories.filter(
          (x) =>
            !filteredCategory.some(
              (i) => i.categorySubTitle === x.categorySubTitle,
            ),
        );
        secondFilter.map(async ({ id, categorySubTitle }) => {
          const foundSubCategory = await this.subCategoryRepository.findOneBy({
            category: { categoryTitle: ele.categoryTitle },
            categorySubTitle,
          });
          if (foundSubCategory)
            throw new ConflictException(
              `${categorySubTitle}은(는) 중복된 카테고리 입니다.`,
            );
          const newSubCategory = this.subCategoryRepository.create({
            categorySubTitle,
            category,
          });
          await this.subCategoryRepository.save(newSubCategory);
        });
      });
    }

    // 수정
    const isSameLength = testDto.filter(
      (x) =>
        foundCategory.filter((i) => {
          if (x.categoryTitle === i.categoryTitle) {
            return x.subCategories.length !== i.subCategories.length;
          }
        }).length > 0,
    );
    
    if(foundCategory.length === testDto.length && isSameLength){
      testDto.map(async ({ id, categoryTitle, subCategories }) => {
        const found = await this.categoryRepository.findOneBy({ id });
        if (!found) throw new ConflictException(`카테고리 아이디를 확인해주세요`);
        if (found.categoryTitle !== categoryTitle) {
          found.categoryTitle = categoryTitle;
        }
        await this.categoryRepository.save(found).then((res) => {
          if (isSameLength.length === 0) {
            const newOne = subCategories.map((ele) => ele.categorySubTitle);
            const chackDuplicate = newOne.some((x, i) => newOne.indexOf(x) !== i);
            if (chackDuplicate)
              throw new ConflictException(
                `중복된 서브카테고리가 있습니다1. 값을 확인해주세요.`,
              );
            subCategories.map(async ({ id: subId, categorySubTitle }) => {
              const checkSameSubCate = await this.subCategoryRepository.find({
                where: { category: { id: res.id }, categorySubTitle },
              });
              if (checkSameSubCate)
                throw new ConflictException(
                  `${id}/${categorySubTitle}중복된 서브카테고리가 있습니다2. 값을 확인해주세요.`,
                );
              const foundSubCategory = await this.subCategoryRepository.findOneBy(
                { id: subId },
              );
              if (foundSubCategory.categorySubTitle !== categorySubTitle) {
                foundSubCategory.categorySubTitle = categorySubTitle;
              }
              await this.subCategoryRepository.save(foundSubCategory);
            });
          }
        });
      });
    }
    
  }
}
