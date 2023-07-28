import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { LessThan, MoreThan, Not } from 'typeorm';

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
    const currentBoard = await this.boardRepository.findOne({where :{id},relations:{subCategory : {category : {user : true}}}})
    const prevBoard = await this.boardRepository.findOne({where :{boardTitle : Not(""), id : LessThan(id), subCategory :{ categorySubTitle : currentBoard.subCategory.categorySubTitle}},relations:{subCategory : true},order:{id:"desc"}})
    const nextBoard = await this.boardRepository.findOne({where :{boardTitle : Not(""), id : MoreThan(id), subCategory :{ categorySubTitle : currentBoard.subCategory.categorySubTitle}},relations:{subCategory : true},order:{id:"asc"}})
    if(!currentBoard){
      throw new NotFoundException('없는 Board Id입니다.')
    }
    return {
      currentBoard,
      prevBoard : prevBoard ?? {},
      nextBoard : nextBoard ?? {}
    }
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


  async deleteBoard(id : number, user : User){
    return this.boardRepository.deleteBoard(id ,user)
  }
  async updateBoard(body, file: Express.Multer.File, user : User){
    return this.boardRepository.updateBoard(body,file, user)
  }

}
