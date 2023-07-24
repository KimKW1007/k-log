import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { FileRepository } from './file.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { BoardRepository } from 'src/board/board.repository';
import { SubCategoryRepository } from 'src/category/category.repository';


@Module({
  imports: [TypeOrmModule.forFeature([FileRepository]),AuthModule],
  controllers: [FileController],
  providers: [FileService, FileRepository, BoardRepository, SubCategoryRepository],
})
export class FileModule {}