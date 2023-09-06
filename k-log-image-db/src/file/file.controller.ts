import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Param,
  Delete,
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

}