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
import uploads from 'src/utils/imageUploads';


@Injectable()
export class BannerRepository extends Repository<Banner> {
  constructor(private dataSource: DataSource,
    private configService : ConfigService ,
    ) {
    super(Banner, dataSource.createEntityManager());
  }

  async updateBanner(listNumber: string, file: Express.Multer.File, user: User){
    if(!user.isAdmin) throw new UnauthorizedException('관리자 권한이 없습니다.')
    const foundBanner = await this.findOneBy({listNumber})
  
    try{
      const imageUrl = await uploads(file.buffer, file.mimetype, this.configService.get("IMGUR_ID"))
      if(!foundBanner){
        const createBanner = this.create({
          imageUrl,
          listNumber
        })
        await this.save(createBanner);
      }else{
        foundBanner.imageUrl = imageUrl;
        await this.save(foundBanner);
      }
      return { message: 'success' };
    }catch(e){
      console.log('오류 발생')
    }
  }

}