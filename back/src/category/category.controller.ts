import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { GetCategories, GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Category } from './category.entity';
import { AuthGuard } from '@nestjs/passport';
import { CreateSubCategoryDto } from './dto/createSubCategory.dto';
import { TestDto } from './dto/test.dto';

@Controller('category')

export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get("/")
  getCurrentUserCategory(): Promise<Category[]>{
    return this.categoryService.getAllCategory();
  }

  @Delete("/:id")
  @UseGuards(AuthGuard())
  deleteCategory(@Param('id', ParseIntPipe) id:number,@GetUser() user: User): Promise<{message:string}>{
    return this.categoryService.deleteCategory(id, user);
  }
  @Delete("/subCategory/:id")
  @UseGuards(AuthGuard())
  deletesSubCategory(@Param('id', ParseIntPipe) id:number,@GetUser() user: User): Promise<{message:string}>{
    return this.categoryService.deletesSubCategory(id, user);
  }


  @Put('/updateCategories')
  @UseGuards(AuthGuard())
  updateTitles(
    @Body() testDto : Category[],
    @GetUser() user: User
  ): Promise<void>{
    return this.categoryService.updateTitles(testDto, user)
  }


}
