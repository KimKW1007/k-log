import { BadRequestException, Injectable } from '@nestjs/common';

import { ImagesDto } from './dto/file-images.dto';
import { ImagesRepository } from './file.repository';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import { Images } from './file.entity';


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

  async createdBoard(boardId : number, userId : string){
    const found = await this.imagesRepository.find({where : {boardId : "작성중", userId}})
    try{
      if(found){
        found.map(board => board.boardId = String(boardId))
        await this.imagesRepository.save(found);
      }
    }catch(e){
      throw new BadRequestException('boardId 변경 중 오류 발생');
    }
    return {message : '변경완료'}
  }

  async deleteFiles(boardId : string, userId : string){
    const found = await this.imagesRepository.find({where : {boardId , userId}})
    if(found){
      try{
        const files =  fs.readdirSync(`${process.cwd()}/uploads`, 'utf8');
        const filtered = files.filter(x => found.some((v, i) => v.imageUrl.includes(x)))
        filtered.map(deleteImageName =>{
          fs.unlinkSync(`${process.cwd()}/uploads/${deleteImageName}`)
        })
        await this.imagesRepository.delete({boardId , userId})
        return {message : "삭제 성공"}
      }catch(e){
        throw new BadRequestException('deleteFiles 오류 발생');
      }
    }
    return {message : '삭제 할 board Image가 없습니다'}
    
  }



  async checkDeleteUnnecessaryFile(body, boardId : string, userId : string){
    const found = await this.imagesRepository.find({where : {boardId , userId}})
    if(!found){
      return  {message : '삭제 할 Image가 없습니다'}
    }
    try{
      const filtered = found.filter(x => !body.imgArr.some((v: string, i: any) => v === x.imageUrl))
      if(!filtered){
        return  {message : '삭제 할 Image가 없습니다'}
      }
      filtered.map(async deleteImageName =>{
        const fsFileName = deleteImageName.imageUrl.split('http://localhost:8000/api/uploads/').at(-1);
        fs.unlinkSync(`${process.cwd()}/uploads/${fsFileName}`)
        await this.imagesRepository.delete({boardId , userId, imageUrl: String(deleteImageName.imageUrl)})
      })
      return {message : "삭제 성공"}
    }catch(e){
      throw new BadRequestException('checkDeleteUnnecessaryFile 오류 발생');
    }
  }


}