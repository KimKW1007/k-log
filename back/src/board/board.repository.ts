import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';
import { SubCategoryRepository } from 'src/category/category.repository';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';


@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(private dataSource: DataSource, private subCategoryRepository: SubCategoryRepository) {
    super(Board, dataSource.createEntityManager());
  }
  private readonly DATA_URL = 'http://localhost:8000/api/uploads';


  async createBoard(body, file : Express.Multer.File, user: User){
    const {boardTitle, contents, categorySubTitle, boardId} = body;
    if (!user) throw new UnauthorizedException('유저정보를 확인해주세요');
    const subCategory = await this.subCategoryRepository.findOneBy({categorySubTitle})
    if(!file){
      try{
        const newBoard = this.create({
          boardTitle,
          contents,
          thumbnail : "",
          subCategory
        })
        await this.save(newBoard)
      }catch(e){
        console.log('오류 발생')
        throw new BadRequestException('board Create 중 오류 발생')
      }
    }else{
      const formData = new FormData();
      file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8')
      const imageBlob = new Blob([file.buffer], { type: file.mimetype });
      formData.append('image', imageBlob, file.originalname);
      formData.append('userId', user.userId);
      formData.append('subTitle', categorySubTitle);
      formData.append('boardId', boardId);
      try{
        const response = await axios.post(this.DATA_URL, formData , {
          headers:{
            'Content-Type' : "multipart/form-data"
          }
        })
        const IMG_URL = response.data.url;
        const newBoard = this.create({
          boardTitle,
          contents,
          thumbnail : IMG_URL,
          subCategory
        })
        await this.save(newBoard)
      }catch(e){
        console.log('오류 발생')
        throw new BadRequestException('board Create 중 오류 발생')
      }
    }
    return { message: 'success' };

  }
}
