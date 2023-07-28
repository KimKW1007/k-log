import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { BoardService } from './board.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Get('/lastBoardId/:categorySubTitle')
  @UseGuards(AuthGuard())
  createLastBoardId(@Param('categorySubTitle') categorySubTitle : string,@GetUser() user : User){
    return this.boardService.createLastBoardId(categorySubTitle, user)
  }

@Delete('/deleteBoard/:id')
  @UseGuards(AuthGuard())
  deleteBoard(@Param("id", ParseIntPipe) id : number, @GetUser() user : User){
    return this.boardService.deleteBoard(id, user)
  }

  @Post("/createBoard")
  @UseInterceptors(FileInterceptor('boardImage'))
  @UseGuards(AuthGuard())
  createBoard(@Body() body, @UploadedFile() file: Express.Multer.File, @GetUser() user : User){
    return this.boardService.createBoard(body, file, user)
  }

  @Get("/:id")
  getBoard(@Param("id", ParseIntPipe) id : number){
    return this.boardService.getBoard(id)
  }

  @Get('/getAllBoard/:page')
  getAllBoards(@Param("page" , ParseIntPipe) page : number = 1){
    return this.boardService.getAllBoards(page)
  }

  @Get('/category/:categoryTitle')
  getBoardsForCategory(@Query("page" , ParseIntPipe) page : number = 1, @Param("categoryTitle") categoryTitle : string){
    return this.boardService.getBoardsForCategory(categoryTitle, page)
  }
  @Get('/subCategory/:categorySubTitle')
  getBoardsForSubCategory(@Query("page" , ParseIntPipe) page : number = 1, @Param("categorySubTitle") categorySubTitle : string){
    return this.boardService.getBoardsForSubCategory(categorySubTitle, page)
  }

  @Post('/category/edit')
  @UseInterceptors(FileInterceptor('boardImage'))
  @UseGuards(AuthGuard())
  updateBoard(@Body() body, @UploadedFile() file: Express.Multer.File, @GetUser() user : User){
    return this.boardService.updateBoard(body, file, user)
  }

}
