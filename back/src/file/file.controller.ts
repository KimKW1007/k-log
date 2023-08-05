import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';




@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(AuthGuard())
  async uploadFile(@Body() body, @UploadedFile() file: Express.Multer.File, @GetUser() user : User) {
    return this.fileService.uploadFile(body.description, file, user)
  }


  @Get('/getAdminPl')
  async getAdminPl(){
    return this.fileService.getAdminPl()
  }
  @Get('/getUserPl')
  @UseGuards(AuthGuard())
  async getUserPl( @GetUser() user : User){
    return this.fileService.getUserPl(user)
  }


}
