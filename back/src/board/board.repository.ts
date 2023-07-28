import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';
import { SubCategoryRepository } from 'src/category/category.repository';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { FileRepository } from 'src/file/file.repository';
import { UserRepository } from 'src/auth/user.repository';

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(private dataSource: DataSource, 
    private subCategoryRepository: SubCategoryRepository, 
    private fileRepository: FileRepository,
    ) {
    super(Board, dataSource.createEntityManager());
  }
  private readonly DATA_IMAGE_URL = 'http://localhost:8000/api/uploads';
  private readonly DATA_BOARD_ID_UPDATE = 'http://localhost:8000/api/createdBoard';
  private readonly DATA_BOARD_DELETE_UNNECESSARY = 'http://localhost:8000/api/unnecessary';
  private readonly DATA_BOARD_DELETE = 'http://localhost:8000/api';


  async createLastBoardId(categorySubTitle : string, user :User){
    const subCategory = await this.subCategoryRepository.findOneBy({ categorySubTitle });
    const foundBoard = await this.findOneBy({boardTitle : '', subCategory :{ category : {user : {id : user.id}}}});
    if(!foundBoard){
      const createTemporaryBoard = this.create({
        boardTitle : '',
        contents : '',
        thumbnail: '',
        author: user.userName,
        authorImage: '',
        tags: '',
        subCategory,
      })
      await this.save(createTemporaryBoard)
      return createTemporaryBoard.id
    }else{
      foundBoard.subCategory = subCategory;
      await this.save(foundBoard)
      return foundBoard.id
    }
  }


  async createBoard(body, file: Express.Multer.File, user: User) {
    const { boardTitle, contents, categorySubTitle, boardId, tags } = body;
    if (!user) throw new UnauthorizedException('유저정보를 확인해주세요');
    const authorImage = await this.fileRepository.findOneBy({ user: { id: user.id } });
    const foundBoard = await this.findOneBy({boardTitle : '', subCategory :{ category : {user : {id : user.id}}}});
    if (!file) {
      try {
        foundBoard.boardTitle = boardTitle;
        foundBoard.contents = contents;
        foundBoard.tags = tags;
        foundBoard.authorImage = authorImage !== null ? authorImage.imageUrl : '',
        foundBoard.createdAt = new Date();
        await this.save(foundBoard).then(async res=>{
          const response = await axios.patch(`${this.DATA_BOARD_ID_UPDATE}/${user.id}`,{boardId : res.id})
        });
      } catch (e) {
        console.log('오류 발생');
        throw new BadRequestException('board Create 중 오류 발생');
      }
    } else {
      const formData = new FormData();
      file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
      const imageBlob = new Blob([file.buffer], { type: file.mimetype });
      formData.append('image', imageBlob, file.originalname);
      formData.append('userId', String(user.id));
      formData.append('subTitle', categorySubTitle);
      formData.append('boardId', '작성중');
      try {
        const response = await axios.post(this.DATA_IMAGE_URL, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        const IMG_URL = response.data.url;
        foundBoard.boardTitle = boardTitle;
        foundBoard.contents = contents;
        foundBoard.thumbnail = IMG_URL;
        foundBoard.tags = tags;
        foundBoard.authorImage = authorImage !== null ? authorImage.imageUrl : '';
        foundBoard.createdAt = new Date();
        await this.save(foundBoard).then(async res=>{
          const response = await axios.patch(`${this.DATA_BOARD_ID_UPDATE}/${user.id}`,{boardId : res.id})
        });
      } catch (e) {
        console.log('오류 발생');
        throw new BadRequestException('board Create 중 오류 발생');
      }
    }
    return { message: 'success' };
  }


  async deleteBoard(id : number, user :User){
    const foundBoard = await this.findOneBy({id, subCategory : { category : {user : {id : user.id}}}})
    if(!foundBoard){
      return {message : '삭제할 board가 없습니다.'}
    }
    try{
      await axios.delete(`${this.DATA_BOARD_DELETE}/${id}/${user.id}`).then(async res=>{
        await this.delete({id})
      })
      return {message : '삭제 완료'}
    }catch(e){
      console.log({e})
      throw new ConflictException("board 삭제 중 오류 발생")
    }
    
  }

  async updateBoard(body, file: Express.Multer.File, user : User){
    const { boardTitle, contents, categorySubTitle, boardId, tags } = body;
    if (!user) throw new UnauthorizedException('유저정보를 확인해주세요');
    const authorImage = await this.fileRepository.findOneBy({ user: { id: user.id } });
    const foundBoard = await this.findOneBy({id:boardId, subCategory :{ category : {user : {id : user.id}}}});
    if (!file) {
      try {
        foundBoard.boardTitle = boardTitle;
        foundBoard.contents = contents;
        foundBoard.tags = tags;
        foundBoard.authorImage = authorImage !== null ? authorImage.imageUrl : '',
        await this.save(foundBoard).then(async res=>{
          const response = await axios.patch(`${this.DATA_BOARD_ID_UPDATE}/${user.id}`,{boardId : res.id})
        }).then(async res=>{
          let imgArr = [];
          const pattern = /http:\/\/localhost:8000[^"]*"/g;
          const result = foundBoard.contents.match(pattern);
          if(result){
            const extractedStrings = result.map(str => str.slice(0, -1));
            imgArr.push(extractedStrings)
          }
          if(foundBoard.thumbnail){
            imgArr.push(foundBoard.thumbnail)
          }
          const deleteUnnecessaryFile = await axios.delete(`${this.DATA_BOARD_DELETE_UNNECESSARY}/${boardId}/${user.id}`,{data :{imgArr : imgArr.flat()}})
        });

      } catch (e) {
        console.log('오류 발생');
        throw new BadRequestException('board Create 중 오류 발생');
      }
    } else {
      const formData = new FormData();
      file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
      const imageBlob = new Blob([file.buffer], { type: file.mimetype });
      formData.append('image', imageBlob, file.originalname);
      formData.append('userId', String(user.id));
      formData.append('subTitle', categorySubTitle);
      formData.append('boardId', `${boardId}`);
      try {
        const response = await axios.post(this.DATA_IMAGE_URL, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        const IMG_URL = response.data.url;
        foundBoard.boardTitle = boardTitle;
        foundBoard.contents = contents;
        foundBoard.thumbnail = IMG_URL;
        foundBoard.tags = tags;
        foundBoard.authorImage = authorImage !== null ? authorImage.imageUrl : '';
        await this.save(foundBoard).then(async res=>{
          const response = await axios.patch(`${this.DATA_BOARD_ID_UPDATE}/${user.id}`,{boardId : res.id})
        }).then(async res=>{
          let imgArr = [];
          const pattern = /http:\/\/localhost:8000[^"]*"/g;
          const result = foundBoard.contents.match(pattern);
          if(result){
            const extractedStrings = result.map(str => str.slice(0, -1));
            imgArr.push(extractedStrings)
          }
          if(foundBoard.thumbnail){
            imgArr.push(foundBoard.thumbnail)
          }
          const deleteUnnecessaryFile = await axios.delete(`${this.DATA_BOARD_DELETE_UNNECESSARY}/${boardId}/${user.id}`,{data :{imgArr : imgArr.flat()}})
        });
      } catch (e) {
        console.log('오류 발생');
        throw new BadRequestException('board Create 중 오류 발생');
      }
    }
    return { message: 'success' };
  }


}
