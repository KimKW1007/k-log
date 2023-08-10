import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CategoryRepository, SubCategoryRepository } from './category.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { User } from 'src/auth/user.entity';
import { Category } from './category.entity';
import { CreateSubCategoryDto } from './dto/createSubCategory.dto';
import { SubCategory } from './subCategory.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
    private subCategoryRepository: SubCategoryRepository
  ) {}

  async getAllCategory(): Promise<Category[]> {
    const category = await this.categoryRepository.find({
      where: { user: { id: 1 } },
      order: { dndNumber: 'ASC', subCategories: { id: 'ASC' } },
    });
    return category;
  }
  async getAllSubCategory(categoryTitle : string): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({
       categoryTitle,  user: { id: 1 }
    });
    if(!category){
      throw new BadRequestException('해당 카테고리를 찾지 못했습니다.')
    }
    return category;
  }

  async updateTitles(categoryDto: Category[], user: User): Promise<any> {
    if (!user.isAdmin) throw new UnauthorizedException('관리자 권한이 없습니다.');
    const foundCategory = await this.categoryRepository.find({
      where: { user: { id: user.id } },
    });
    // client 에서 받은 arr categoryTitle 중복값 확인
    const categoryTitleMap = categoryDto.map((ele) => ele.categoryTitle);
    const chackSameCategoryTitle = categoryTitleMap.some((x, i) => categoryTitleMap.indexOf(x) !== i);
    if (chackSameCategoryTitle)
      throw new BadRequestException(`상위 카테고리 중 중복된 값이 있습니다.`, {
        cause: new Error(),
      });
    //client 에서 받은 arr sub 중복값 확인
    const subCategoryTitleMap = categoryDto.map(({ subCategories }) => {
      const subCategoriesMap = subCategories.map(({ categorySubTitle }, i) => categorySubTitle);
      const chackSameSubCategoryTitle = subCategoriesMap.some((x, i) => subCategoriesMap.indexOf(x) !== i);
      if (chackSameSubCategoryTitle) throw new BadRequestException(`하위 카테고리 중 중복된 값이 있습니다1.`, { cause: new Error() });
    });

    const createCategoryOrAll = async () => {
      //create categoryTitle or all
      const notFoundId = categoryDto.filter((x) => !x.id);
      if (notFoundId.length >= 1) {
        // client 에서 받은  arr와 database arr 중복확인(categoryTitle)
        for(const category of notFoundId){
          const newCategory = this.categoryRepository.create({
            categoryTitle: category.categoryTitle,
            dndNumber : category.dndNumber,
            user,
          });
          const savedCategory = await this.categoryRepository.save(newCategory)
          if (category.subCategories.length < 1) return;
          for(const subCategory of category.subCategories){
            const newSubCategory = this.subCategoryRepository.create({
              categorySubTitle: subCategory.categorySubTitle,
              category: savedCategory,
            })
            await this.subCategoryRepository.save(newSubCategory);
          }
        }
      }
    };

    const createSubCategory = async () => {
      const foundId = categoryDto.filter((x) => x.id);
      const notFoundSubId = foundId
        .filter((x) => {
          return x.subCategories.some((i) => !i.id);
        })
        .flat();
      // create SubCategory
      if (notFoundSubId.length >= 1) {
        // client 에서 받은  arr와 database arr 중복확인(subCategories.length)
        for(const subCategory of notFoundSubId){
          const category = await this.categoryRepository.findOneBy({
            id: subCategory.id,
          });
          const filteredCategory = await this.subCategoryRepository.find({
            where: { category: { id: subCategory.id } },
          });
          const secondFilter = subCategory.subCategories.filter((x) => !filteredCategory.some((i) => i.id === x.id));
          for(const {categorySubTitle} of secondFilter){
            const newSubCategory = this.subCategoryRepository.create({
              categorySubTitle,
              category,
            });
            await this.subCategoryRepository.save(newSubCategory);
          }
        }
      }
    };

    const deleteTitle = () => {
      // delete Title
      if (foundCategory.length > categoryDto.length) {
        const filteredCategory = foundCategory.filter((x) => !categoryDto.some((i) => i.id === x.id));
        filteredCategory.map(async ({ id, categoryTitle, subCategories }) => {
          const foundSubCategory = await this.subCategoryRepository.find({
            where: { category: { id } },
          });
          if (foundSubCategory.length >= 1) {
            const deleteSubCategory = await this.subCategoryRepository.delete({
              category: { id },
            });
            if (deleteSubCategory.affected === 0) {
              throw new NotFoundException(`Can't find subCategories with categoryTitle ${categoryTitle}`);
            }
          }
          const deleteCategory = await this.categoryRepository.delete({ id });

          if (deleteCategory.affected === 0) {
            throw new NotFoundException(`Can't find categoryTitle with id ${id}`);
          }
        });
      }
    };

    const deleteOnlySubTitle = () => {
      // delete only SubTitle
     
      const dtoMap = categoryDto.map((ele) => ele.subCategories).flat();
      const filteredSubCategory = foundCategory
        .map((ele) => {
          const filterd = ele.subCategories.filter((x) => !dtoMap.some((v, i) => v.id === x.id));
          return filterd;
        })
        .flat();

      const isHaveDeleteCategoryTitle = foundCategory.filter((ele) => categoryDto.some((x) => x.id === ele.id));
      const foundDeleteSubTitles = isHaveDeleteCategoryTitle
        .map((ele) => {
          return ele.subCategories.filter((x) => filteredSubCategory.some((v) => v.id === x.id));
        })
        .flat();

      if (foundDeleteSubTitles.length >= 1) {
        foundDeleteSubTitles.map(async ({ id }) => {
          const foundSubCategory = await this.subCategoryRepository.findOneBy({
            id,
          });
          if (!foundSubCategory) return;
          const deleteSubCategory = await this.subCategoryRepository.delete({
            id,
          });
          if (deleteSubCategory.affected === 0) {
            throw new NotFoundException(`Can't find subCategories with id ${id}`);
          }
        });
      }
    };

    const updateTitles = async () => {
      // 수정
      const foundId = categoryDto.filter((x) => x.id);
      if (foundId.length >= 1) {
        for(const category of foundId){
          const found = await this.categoryRepository.findOneBy({ id: category.id });
          if (!found) throw new BadRequestException(`상위 카테고리 중 비교할 값이 없습니다.`, { cause: new Error() });
          found.categoryTitle = category.categoryTitle;
          found.dndNumber = category.dndNumber;
          await this.categoryRepository.save(found).then(async (res) => {
            const notFoundSubId = category.subCategories.filter((i) => i.id);
            if (notFoundSubId.length < 1) return;
            for(const {id : subId ,categorySubTitle} of notFoundSubId){
              const foundSubCategory = await this.subCategoryRepository.findOneBy({ id: subId });
              if (!foundSubCategory) throw new BadRequestException(`하위 카테고리 중 비교할 값이 없습니다.`, { cause: new Error() });
              foundSubCategory.categorySubTitle = categorySubTitle;
              await this.subCategoryRepository.save(foundSubCategory);
            }
          });
        }
      }
    };
    createCategoryOrAll();
    createSubCategory();
    deleteTitle();
    deleteOnlySubTitle();
    updateTitles();

    return { message: 'success' };
  }
}
