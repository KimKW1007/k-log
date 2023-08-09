import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BannerRepository } from './banner.repository';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(BannerRepository)
    private bannerRepository: BannerRepository,
  ) {}

  async updateImage(listNumber : string, file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('파일이 존재하지 않습니다.');
    }

    return this.bannerRepository.updateImage(listNumber, file);
  }
}
