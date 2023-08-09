import { Module } from '@nestjs/common';
import { FileModule } from './file/file.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { AppController } from './app.controller';
import { BannerModule } from './banner/banner.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig),FileModule, BannerModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
