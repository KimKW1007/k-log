import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { FindModule } from './find/find.module';
import { CategoryModule } from './category/category.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig),AuthModule, FindModule, CategoryModule, FileModule],
})
export class AppModule {}
