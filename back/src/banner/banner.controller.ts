import { Controller, Body, Delete, Get, Post, UploadedFile, UseInterceptors, UseGuards, Param, ParseIntPipe } from '@nestjs/common';
import { BannerService } from './banner.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateProjectDto } from './dto/project.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('banner')
export class BannerController {
  constructor(private bannerService: BannerService) {}

  @Get('/banners')
  getBanners(){
    return this.bannerService.getBanners()
  }
  
  @Post('/updateBanner')
  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor('image'))
  updateBanner(@Body("listNumber") listNumber : string , @UploadedFile() file: Express.Multer.File, @GetUser() user : User){
    return this.bannerService.updateBanner(listNumber, file, user)
  }
  
  @Get('/projects')
  getProjects(){
    return this.bannerService.getProjects()
  }
  @Post('/createProject')
  @UseGuards(AuthGuard())
  createProject(@Body() createProjectDto : CreateProjectDto , @GetUser() user : User){
    return this.bannerService.createProject(createProjectDto, user)
  }
  @Delete('/deleteProject')
  @UseGuards(AuthGuard())
  deleteProject(@Body("id") id : number, @GetUser() user : User){
    return this.bannerService.deleteProject(id, user)
  }
}
