import { Module } from '@nestjs/common';
import { FileModule } from './file/file.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { BannerModule } from './banner/banner.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),TypeOrmModule.forRoot(typeORMConfig),FileModule, BannerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
