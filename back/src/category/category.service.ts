import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import {
  CategoryRepository,
  SubCategoryRepository,
} from './category.repository';
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

  async getAllCategory(): Promise<Category[]> {
    const category = await this.categoryRepository.find({
      where: { user: { id: 1 } },
    });
    return category;
  }



  async updateTitles(categoryDto: Category[], user: User): Promise<any> {
    if (user.id > 1) throw new UnauthorizedException("관리자 권한이 없습니다.", { cause: new Error()})
    const foundCategory = await this.categoryRepository.find({
      where: { user: { id: user.id } },
    });
    // client 에서 받은 arr categoryTitle 중복값 확인
      const categoryTitleMap = categoryDto.map((ele) => ele.categoryTitle);
      const chackSameCategoryTitle = categoryTitleMap.some(
        (x, i) => categoryTitleMap.indexOf(x) !== i,
      );
      if (chackSameCategoryTitle) throw new BadRequestException(`상위 카테고리 중 중복된 값이 있습니다.`, { cause: new Error()})
    //client 에서 받은 arr sub 중복값 확인
    const subCategoryTitleMap = categoryDto.map(({subCategories}) =>{
      const subCategoriesMap = subCategories.map(({categorySubTitle}, i) => categorySubTitle);
      const chackSameSubCategoryTitle = subCategoriesMap.some(
        (x, i) => subCategoriesMap.indexOf(x) !== i,
      );
      if (chackSameSubCategoryTitle) throw new BadRequestException(`하위 카테고리 중 중복된 값이 있습니다1.`, { cause: new Error()})
    });
    



    //create categoryTitle or all
    if (foundCategory.length < categoryDto.length) {
      // client 에서 받은  arr와 database arr 중복확인(categoryTitle)
      const filteredCategory = categoryDto.filter(
        (x) => !foundCategory.some((i) => i.categoryTitle === x.categoryTitle),
      );

      filteredCategory.map(async ({ id, categoryTitle, subCategories }) => {
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
    if (foundCategory.length === categoryDto.length && foundCategory.length >= 1) {
      // client 에서 받은  arr와 database arr 중복확인(subCategories.length)
      const filteredSubCategory = categoryDto.filter(
        (x) =>
          !foundCategory.some(
            (i) => i.subCategories.length === x.subCategories.length,
          ),
      );
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
          /* const foundSubCategory = await this.subCategoryRepository.findOneBy({
            category: { categoryTitle: ele.categoryTitle },
            categorySubTitle,
          });
          if (foundSubCategory) throw new BadRequestException(`하위 카테고리 중 중복된 값이 있습니다.`, { cause: new Error()}) */
          const newSubCategory = this.subCategoryRepository.create({
            categorySubTitle,
            category,
          });
          await this.subCategoryRepository.save(newSubCategory);
        });
      });
    }

    // client 에서 받은  arr와 database arr 중복확인(categoryTitle)

    if (foundCategory.length > categoryDto.length) {
      const filteredCategory = foundCategory.filter(
        (x) => !categoryDto.some((i) => i.categoryTitle === x.categoryTitle),
      );
      filteredCategory.map(async ({ id, categoryTitle, subCategories }) => {
        const deleteSubCategory = await this.subCategoryRepository.delete({
          category: { id },
        });
        const deleteCategory = await this.categoryRepository.delete({ id });
        if (deleteSubCategory.affected === 0) {
          throw new NotFoundException(
            `Can't find subCategories with categoryTitle ${categoryTitle}`,
          );
        }
        if (deleteCategory.affected === 0) {
          throw new NotFoundException(`Can't find categoryTitle with id ${id}`);
        }
      });
    }

    // 수정
    if (foundCategory.length === categoryDto.length) {
      const isSameLength = categoryDto.filter(
        (x) =>
          foundCategory.filter((i) => {
            if (x.categoryTitle === i.categoryTitle) {
              return x.subCategories.length !== i.subCategories.length;
            }
          }).length > 0,
      );
      if (isSameLength) {
        
        categoryDto.map(async ({ id, categoryTitle, subCategories }) => {
          const found = await this.categoryRepository.findOneBy({ id });
          if (!found)  throw new BadRequestException(`상위 카테고리 중 비교할 값이 없습니다.`, { cause: new Error()})
          if (found.categoryTitle !== categoryTitle) {
            found.categoryTitle = categoryTitle;
          }
          await this.categoryRepository.save(found).then((res) => {
            if (isSameLength.length === 0) {
              const newOne = subCategories.map((ele) => ele.categorySubTitle);
              const chackDuplicate = newOne.some(
                (x, i) => newOne.indexOf(x) !== i,
              );
              if (chackDuplicate)  throw new BadRequestException(`하위 카테고리 중 중복된 값이 있습니다.`, { cause: new Error()})
              subCategories.map(async ({ id: subId, categorySubTitle }) => {
                const foundSubCategory =
                  await this.subCategoryRepository.findOneBy({ id: subId });
                  if (!foundSubCategory)  throw new BadRequestException(`하위 카테고리 중 비교할 값이 없습니다.`, { cause: new Error()})
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
    return {message : "success"}
  }
}
