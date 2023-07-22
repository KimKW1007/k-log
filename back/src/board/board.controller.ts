import { Body, Controller, Get, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { BoardService } from './board.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Get('/lastBoardId')
  getBoardLastId(){
    return this.boardService.getBoardLastId()
  }

  @Post("/createBoard")
  @UseInterceptors(FileInterceptor('boardImage'))
  @UseGuards(AuthGuard())
  createBoard(@Body() body, @UploadedFile() file: Express.Multer.File, @GetUser() user : User){
    return this.boardService.createBoard(body, file, user)
  }


}
