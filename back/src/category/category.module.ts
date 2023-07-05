import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryRepository, SubCategoryRepository } from './category.repository';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([CategoryRepository]),AuthModule],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository, SubCategoryRepository],
})
export class CategoryModule {}