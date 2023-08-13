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

import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';



@Injectable()
export class BannerRepository extends Repository<Banner> {
  constructor(private dataSource: DataSource, private configService : ConfigService) {
    super(Banner, dataSource.createEntityManager());
  }
  


  async updateImage(listNumber : string ,file: Express.Multer.File){
    const IMG_URL = `${this.configService.get('BASE_HOST_URL')}api/uploads/${file.filename}`;
    const foundBanner = await this.findOne({where: {listNumber}, order : {id : "ASC"}})
    if(!foundBanner){
      const creatUrl = this.create({
        imageUrl : IMG_URL,
        listNumber
      })
      await this.save(creatUrl)
    }else{
      try {
        const files = fs.readdirSync(`${process.cwd()}/uploads`, 'utf8');
        const filtered = files.find((x) => foundBanner.imageUrl.includes(x));
        if(filtered){
          fs.unlinkSync(`${process.cwd()}/uploads/${filtered}`);
        }
      } catch (e) {
        throw new BadRequestException('deleteFiles 오류 발생');
      }
      foundBanner.imageUrl = IMG_URL
      await this.save(foundBanner)
    }
    return {url : IMG_URL}
  }

}