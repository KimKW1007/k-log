import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Images } from './file.entity';
import { ImagesDto } from './dto/file-images.dto';
import { ConfigService } from '@nestjs/config';





@Injectable()
export class ImagesRepository extends Repository<Images> {
  constructor(private dataSource: DataSource, private configService : ConfigService) {
    super(Images, dataSource.createEntityManager());
  }
  
  async createImageUrl (body ,file: Express.Multer.File){
    const IMG_URL = `${this.configService.get('BASE_HOST_URL')}api/uploads/${file.filename}`;
    if(!body.isProfile){
      const creatUrl = this.create({
        imageUrl : IMG_URL,
        userId : body.userId,
        subTitle : body.subTitle,
        boardId : body.boardId,
      })
      await this.save(creatUrl)
    }
    return {url : IMG_URL}
  }

}

