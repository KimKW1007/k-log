import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseGuards, Res, ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { GetCategories, GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Category } from './category.entity';
import { AuthGuard } from '@nestjs/passport';
import { CreateSubCategoryDto } from './dto/createSubCategory.dto';
import { TestDto } from './dto/test.dto';
import { SubCategory } from './subCategory.entity';

@Controller('category')

export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get("/")
  getAllCategory(): Promise<Category[]>{
    return this.categoryService.getAllCategory();
  }

  @Get('/getSubCategory/:categoryTitle')
  getAllSubCategory(@Param('categoryTitle') categoryTitle : string): Promise<Category>{
    return this.categoryService.getAllSubCategory(categoryTitle.replace("-","/"));
  }


  @Put('/updateCategories')
  @UseGuards(AuthGuard())
  updateTitles(
    @Body(ValidationPipe) categoryDto : Category[],
    @GetUser() user: User
  ): Promise<any>{
    
    return this.categoryService.updateTitles(categoryDto, user)
  }


}
