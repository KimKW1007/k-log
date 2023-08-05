import {
  Body,
  Controller,
  Post,
  Get,
  UploadedFile,
  UseInterceptors,
  Param,
  Res,
  Delete,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';


@Controller()
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('uploads')
  @UseInterceptors(FileInterceptor('image'))
  uploadFile(@Body() body , @UploadedFile() file: Express.Multer.File) {
    return this.fileService.uploadFile(body, file);
  }

  @Patch('createdBoard/:userId')
  createdBoard(@Body() body , @Param('userId') userId : string){
    return this.fileService.createdBoard(body.boardId, userId);
  }


  @Delete('/deleteFiles/:boardId/:userId')
  deleteFiles(@Param('boardId') boardId : string,@Param('userId') userId : string, ): Promise<{ message: string; }>{
    return this.fileService.deleteFiles(boardId, userId)
  }

  @Delete("/unnecessary/:boardId/:userId")
  checkDeleteUnnecessaryFile(@Body() body, @Param('boardId') boardId : string,@Param('userId') userId : string,){
    return this.fileService.checkDeleteUnnecessaryFile(body, boardId, userId)
  }

  @Delete("/withdraw/:userId")
  withdraw(@Param('userId') userId : string){
    return this.fileService.withdraw(userId)
  }


  @Get('uploads/:filename')
  async getImage(
    @Param('filename') filename: string,
    @Res() res
  ) {
    res.sendFile(filename, { root: 'uploads' });
  }
}