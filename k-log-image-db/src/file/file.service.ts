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


  async deleteFiles(boardId : string, userId : string){
    const found = this.imagesRepository.find({where : {boardId , userId}})
    if(found){
      try{
        await this.imagesRepository.delete({boardId , userId})
        return {message : "삭제 성공"}
      }catch(e){
        throw new BadRequestException('deleteFiles 오류 발생');
      }
    }
    return {message : '삭제 할 board Image가 없습니다'}
    
  }

}