import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
  UnauthorizedException
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Banner } from './banner.entity';
import { User } from 'src/auth/user.entity';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class BannerRepository extends Repository<Banner> {
  constructor(private dataSource: DataSource,
    private configService : ConfigService ,
    ) {
    super(Banner, dataSource.createEntityManager());
  }
  private readonly CREATE_URL =  this.configService.get("IMAGE_SERVER_BANNER_UPDATE_URL") || 'http://localhost:8000/api/banner/updateImage';
  

  async updateBanner(listNumber: string, file: Express.Multer.File, user: User){
    if(!user.isAdmin) throw new UnauthorizedException('관리자 권한이 없습니다.')
    const foundBanner = await this.findOneBy({listNumber})
    console.log({file})

    const formData = new FormData();
    file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8')
    const imageBuffer = Buffer.from(file.buffer);
    const imageBlob = new Blob([imageBuffer], { type: file.mimetype });
    formData.append('image', imageBlob, file.originalname);
    formData.append('listNumber', listNumber);
    try{
      const response = await axios.patch(this.CREATE_URL, formData , {
        headers:{
          'Content-Type' : "multipart/form-data"
        }
      })
      const IMG_URL = response.data.url;
      if(!foundBanner){
        const createBanner = this.create({
          imageUrl: IMG_URL,
          listNumber
        })
        await this.save(createBanner);
      }else{
        foundBanner.imageUrl = IMG_URL;
        await this.save(foundBanner);
      }
      return { message: 'success' };
    }catch(e){
      console.log('오류 발생')
    }
  }

}