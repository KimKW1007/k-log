import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { FindModule } from './find/find.module';
import { CategoryModule } from './category/category.module';
import { FileModule } from './file/file.module';
import { BoardModule } from './board/board.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig),AuthModule, FindModule, CategoryModule, FileModule, BoardModule, CommentModule],
})
export class AppModule {}
