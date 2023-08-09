import { Body, Controller, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { BannerService } from './banner.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('banner')
export class BannerController {
  constructor(private bannerService: BannerService) {}


  @Patch('/updateImage')
  @UseInterceptors(FileInterceptor('image'))
  updateImage(@Body("listNumber") listNumber : string , @UploadedFile() file: Express.Multer.File){
    return this.bannerService.updateImage(listNumber, file);
  }

}
