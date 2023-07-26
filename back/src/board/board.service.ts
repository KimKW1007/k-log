import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Not } from 'typeorm';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}
  private TAKE = 6;

  async createBoard(body,file: Express.Multer.File, user : User){
    return this.boardRepository.createBoard(body,file, user)
  }


  async createLastBoardId(categorySubTitle : string, user : User){
    return this.boardRepository.createLastBoardId(categorySubTitle ,user)
  }

  async getBoard(id : number){
    const found = await this.boardRepository.findOneBy({id})
    if(!found){
      throw new NotFoundException('없는 Board Id입니다.')
    }
    return found
  }

  async getAllBoards(page: number){
    const [boards, total] = await this.boardRepository.findAndCount({where : {boardTitle : Not("")}, relations:{subCategory : true}, order : {id : "desc"}, take : this.TAKE , skip : (page - 1) * this.TAKE})
    return {
        boards,
        last_page : Math.ceil(total / this.TAKE),
    } ?? {}
  }
  async getBoardsForCategory(categoryTitle : string, page : number){
    const [boards, total] = await this.boardRepository.findAndCount({where : {boardTitle : Not(""), subCategory : {category : {categoryTitle}}}, relations:{subCategory : true}, order : {id : "desc"}, take : this.TAKE, skip:(page - 1) * this.TAKE })
    return {
      boards,
      last_page : Math.ceil(total / this.TAKE),
  } ?? {}
  }

  async getBoardsForSubCategory(categorySubTitle : string, page : number){
    const [boards, total] = await this.boardRepository.findAndCount({where : {boardTitle : Not(""), subCategory : {categorySubTitle}}, relations:{subCategory : true}, order : {id : "desc"}, take : this.TAKE, skip :(page - 1) * this.TAKE })
    return {
      boards,
      last_page : Math.ceil(total / this.TAKE),
  } ?? {}
  }


  async deleteTemporaryBoard(categorySubTitle : string, user : User){
    return this.boardRepository.deleteTemporaryBoard(categorySubTitle ,user)
  }

}
