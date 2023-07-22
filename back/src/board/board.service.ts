import { Injectable } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  async createBoard(body,file: Express.Multer.File, user : User){
    return this.boardRepository.createBoard(body,file, user)
  }


  async getBoardLastId(){
    const foundLastId =  await this.boardRepository.find({order : {id : 'desc'},take: 1})
    if(!foundLastId[0]){
      return 1
    }
    return foundLastId[0].id + 1
  }

}
