import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports:[TypeOrmModule.forFeature([BoardRepository]),CategoryModule],
  controllers: [BoardController],
  providers: [BoardService, BoardRepository]
})
export class BoardModule {}
