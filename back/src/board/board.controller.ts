import { Controller, Get, UseGuards } from '@nestjs/common';
import { BoardService } from './board.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Get('/lastBoardId')
  getBoardLastId(){
    return this.boardService.getBoardLastId()
  }


}
