import { BadRequestException, Injectable } from '@nestjs/common';

import { ImagesDto } from './dto/file-images.dto';
import { ImagesRepository } from './file.repository';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class FileService {
  constructor(
    @InjectRepository(ImagesRepository)
    private imagesRepository: ImagesRepository,
  ) {}
  async uploadFile(body ,file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('파일이 존재하지 않습니다.');
    }
    
    return this.imagesRepository.createImageUrl(body, file);
  }
}