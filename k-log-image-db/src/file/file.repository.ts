import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Images } from './file.entity';
import { ImagesDto } from './dto/file-images.dto';
import * as config from "config"



const defaultURLConfig = config.get("defaultURL");


@Injectable()
export class ImagesRepository extends Repository<Images> {
  constructor(private dataSource: DataSource) {
    super(Images, dataSource.createEntityManager());
  }
  
  async createImageUrl (body ,file: Express.Multer.File){
    const IMG_URL = `${defaultURLConfig.hostURL}api/uploads/${file.filename}`;
    if(!body.isProfile){
      const creatUrl = this.create({
        imageUrl : IMG_URL,
        userId : body.userId,
        subTitle : body.subTitle,
        subTitleIdx : body.subTitleIdx,
      })
      await this.save(creatUrl)
    }
    return {url : IMG_URL}
  }

}

