import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { GetCategories, GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Category } from './category.entity';
import { AuthGuard } from '@nestjs/passport';
import { CreateSubCategoryDto } from './dto/createSubCategory.dto';

@Controller('category')

export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post("/createCategory")
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  createCategory(@Body() createCategoryDto : CreateCategoryDto , @GetUser() user: User):Promise<{message: string}>{
    return this.categoryService.createCategory(createCategoryDto, user);
  }
  @Post("/createSubCategory")
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  createSubCategory(@Body() createSubCategoryDto : CreateSubCategoryDto ,  @GetCategories() category: Category , @GetUser() user: User):Promise<{message: string}>{
    return this.categoryService.createSubCategory(createSubCategoryDto,  category, user);
  }

  @Get("/")
  getCurrentUserCategory(): Promise<Category[]>{
    return this.categoryService.getAllCategory();
  }

  @Delete("/:id")
  @UseGuards(AuthGuard())
  deleteCategory(@Param('id', ParseIntPipe) id:number,@GetUser() user: User): Promise<{message:string}>{
    return this.categoryService.deleteCategory(id, user);
  }

  @Patch("/:id")
  @UseGuards(AuthGuard())
  updateTitles(
    @Param('id', ParseIntPipe) id:number,
    @Body() createCategoryDto : CreateCategoryDto,
    @GetUser() user: User
  ){
    return this.categoryService.updateTitles(id, createCategoryDto, user)
  }


}
