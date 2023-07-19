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
  
  async createImageUrl (imagesDto ,file: Express.Multer.File){
    const IMG_URL = `${defaultURLConfig.hostURL}api/uploads/${file.filename}`;
    const creatUrl = this.create({
      imageUrl : IMG_URL,
      userId : imagesDto.userId
    })

    await this.save(creatUrl)
    return {url : IMG_URL}
  }

}

