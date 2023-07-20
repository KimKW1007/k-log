import {
  Body,
  Controller,
  Post,
  Get,
  UploadedFile,
  UseInterceptors,
  Param,
  Res,
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

  @Get('uploads/:filename')
  async getImage(
    @Param('filename') filename: string,
    @Res() res
  ) {
    res.sendFile(filename, { root: 'uploads' });
  }
}