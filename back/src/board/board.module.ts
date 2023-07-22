import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { CategoryModule } from 'src/category/category.module';
import { AuthModule } from 'src/auth/auth.module';
import { SubCategoryRepository } from 'src/category/category.repository';

@Module({
  imports:[TypeOrmModule.forFeature([BoardRepository]),CategoryModule, AuthModule],
  controllers: [BoardController],
  providers: [BoardService, BoardRepository, SubCategoryRepository]
})
export class BoardModule {}
