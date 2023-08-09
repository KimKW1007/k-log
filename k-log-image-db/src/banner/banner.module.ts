import { Module } from '@nestjs/common';
import { BannerController } from './banner.controller';
import { BannerService } from './banner.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BannerRepository } from './banner.repository';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptionsFactory } from 'src/utils/multer.options.factory';

@Module({
  imports: [
    TypeOrmModule.forFeature([BannerRepository]),
    MulterModule.registerAsync({
      useFactory: multerOptionsFactory,
    }),
  ],
  controllers: [BannerController],
  providers: [BannerService, BannerRepository]
})
export class BannerModule {}
