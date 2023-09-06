import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';
import { SubCategoryRepository } from 'src/category/category.repository';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { FileRepository } from 'src/file/file.repository';
import { UserRepository } from 'src/auth/user.repository';
import { ConfigService } from '@nestjs/config';
import uploads from 'src/utils/imageUploads';

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(private dataSource: DataSource, 
    private subCategoryRepository: SubCategoryRepository, 
    private fileRepository: FileRepository,
    private configService : ConfigService ,
    ) {
    super(Board, dataSource.createEntityManager());
  }

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
    if (!user.isAdmin) throw new UnauthorizedException('관리자 권한이 없습니다.');
    const authorImage = await this.fileRepository.findOneBy({ user: { id: user.id } });
    const foundBoard = await this.findOneBy({boardTitle : '', subCategory :{ category : {user : {id : user.id}}}});
    if (!file) {
      try {
        foundBoard.boardTitle = boardTitle;
        foundBoard.contents = contents;
        foundBoard.tags = tags;
        foundBoard.authorImage = authorImage?.imageUrl ??  '',
        foundBoard.createdAt = new Date();
        const newBoard = await this.save(foundBoard)
      return { message: 'success', boardId : newBoard.id };
      } catch (e) {
        console.log('오류 발생');
        throw new BadRequestException('board Create 중 오류 발생');
      }
    } else {
      try {
        const imageUrl = await uploads(file.buffer, file.mimetype, this.configService.get("IMGUR_ID"))
        foundBoard.boardTitle = boardTitle;
        foundBoard.contents = contents;
        foundBoard.thumbnail = imageUrl;
        foundBoard.tags = tags;
        foundBoard.authorImage = authorImage?.imageUrl ??  '';
        foundBoard.createdAt = new Date();
        const newBoard = await this.save(foundBoard)
        return { message: 'success', boardId : newBoard.id };
      } catch (e) {
        console.log('오류 발생');
        throw new BadRequestException('board Create 중 오류 발생');
      }
    }
  }


  async deleteBoard(id : number, user :User){
    if (!user.isAdmin) throw new UnauthorizedException('관리자 권한이 없습니다.');
    const foundBoard = await this.findOneBy({id, subCategory : { category : {user : {id : user.id}}}})
    if(!foundBoard){
      return {message : '삭제할 board가 없습니다.'}
    }
    try{
      await this.delete({id})
      return {message : '삭제 완료'}
    }catch(e){
      console.log({e})
      throw new ConflictException("board 삭제 중 오류 발생")
    }
    
  }

  async updateBoard(body, file: Express.Multer.File, user : User){
    const { boardTitle, contents, categorySubTitle, boardId, tags } = body;
    if (!user.isAdmin) throw new UnauthorizedException('관리자 권한이 없습니다.');
    const authorImage = await this.fileRepository.findOneBy({ user: { id: user.id } });
    const foundBoard = await this.findOneBy({id:boardId, subCategory :{ category : {user : {id : user.id}}}});
    if (!file) {
      try {
        foundBoard.boardTitle = boardTitle;
        foundBoard.contents = contents;
        foundBoard.tags = tags;
        foundBoard.authorImage = authorImage?.imageUrl ??  '',
        await this.save(foundBoard)
      } catch (e) {
        console.log('오류 발생');
        throw new BadRequestException('board Create 중 오류 발생');
      }
    } else {
      try {
        const imageUrl = await uploads(file.buffer, file.mimetype, this.configService.get("IMGUR_ID"))
        foundBoard.boardTitle = boardTitle;
        foundBoard.contents = contents;
        foundBoard.thumbnail = imageUrl;
        foundBoard.tags = tags;
        foundBoard.authorImage = authorImage?.imageUrl ??  '';
        await this.save(foundBoard)
      } catch (e) {
        console.log('오류 발생');
        throw new BadRequestException('board Create 중 오류 발생');
      }
    }
    return { message: 'success' };
  }


}
