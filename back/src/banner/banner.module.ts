import { Module } from '@nestjs/common';
import { BannerController } from './banner.controller';
import { BannerService } from './banner.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BannerRepository } from './banner.repository';
import { ProjectRepository } from './project.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BannerRepository]),TypeOrmModule.forFeature([ProjectRepository]),AuthModule],
  controllers: [BannerController],
  providers: [BannerService, BannerRepository, ProjectRepository]
})
export class BannerModule {}
