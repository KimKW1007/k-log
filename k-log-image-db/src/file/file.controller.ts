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


  @Delete('/:boardId/:userId')
  deleteFiles(@Param('boardId', ParseIntPipe) boardId : number,@Param('userId') userId : string, ){
    console.log('m',{boardId})
    console.log('m',{userId})
    // return this.fileService.deleteFiles(String(boardId), userId)
  }

  @Get('uploads/:filename')
  async getImage(
    @Param('filename') filename: string,
    @Res() res
  ) {
    res.sendFile(filename, { root: 'uploads' });
  }
}