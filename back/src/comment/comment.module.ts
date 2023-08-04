import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentRepository } from './comment.repository';
import { BoardRepository } from 'src/board/board.repository';
import { SubCategoryRepository } from 'src/category/category.repository';
import { FileRepository } from 'src/file/file.repository';
import { ReplyRepository } from './reply.repository';

@Module({
  imports:[TypeOrmModule.forFeature([CommentRepository]),TypeOrmModule.forFeature([ReplyRepository]),AuthModule],
  controllers: [CommentController],
  providers: [CommentService,CommentRepository,BoardRepository, SubCategoryRepository, FileRepository, ReplyRepository]
})
export class CommentModule {}
