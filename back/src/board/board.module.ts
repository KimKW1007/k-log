import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { AuthModule } from 'src/auth/auth.module';
import { SubCategoryRepository } from 'src/category/category.repository';
import { FileRepository } from 'src/file/file.repository';
import { CommentRepository } from 'src/comment/comment.repository';
import { ReplyRepository } from 'src/comment/reply.repository';


@Module({
  imports:[TypeOrmModule.forFeature([BoardRepository]),AuthModule],
  controllers: [BoardController],
  providers: [BoardService, BoardRepository, SubCategoryRepository, FileRepository, CommentRepository, ReplyRepository],
})
export class BoardModule {}
