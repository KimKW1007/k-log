import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as config from 'config';
import * as AWS from 'aws-sdk';
import { User } from 'src/auth/user.entity';
import { FileRepository } from './file.repository';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { BoardRepository } from 'src/board/board.repository';

const S3Config = config.get('S3');

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileRepository)
    private fileRepository: FileRepository,
    private boardRepository: BoardRepository
  ) {}
  private readonly DATA_URL = 'http://localhost:8000/api/uploads';
  
  async uploadFile(description : string, file: Express.Multer.File, user: User){
    if (!user) throw new UnauthorizedException('유저정보를 확인해주세요');
    const found = await this.fileRepository.findOneBy({ user: { id: user.id } });
    if (!file) {
      if(!found){
        const createUserPl = this.fileRepository.create({
          imageUrl: '',
          description: description,
          user,
        });
        await this.fileRepository.save(createUserPl);
      }else{
        found.description = description;
        await this.fileRepository.save(found);
      }
      return { message: 'Only changed Description' };
    }
    
    const formData = new FormData();
    file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8')
    const imageBuffer = Buffer.from(file.buffer);
    const imageBlob = new Blob([imageBuffer], { type: file.mimetype });
    formData.append('image', imageBlob, file.originalname);
    formData.append('userId', String(user.id));
    formData.append('isProfile', 'true');
    const foundBoards = await this.boardRepository.find({where : {subCategory : {category : {user : {id : user.id}}}}})
    try{
      const response = await axios.post(this.DATA_URL, formData , {
        headers:{
          'Content-Type' : "multipart/form-data"
        },
        params:{
          userId : user.userId
        }
      })
      const IMG_URL = response.data.url;
      if(!found){
        const createUserPl = this.fileRepository.create({
          imageUrl: IMG_URL,
          description: description,
          user,
        });
        await this.fileRepository.save(createUserPl);
      }else{
        found.imageUrl = IMG_URL;
        found.description = description;
        await this.fileRepository.save(found);
      }
      if(foundBoards){
        foundBoards.map(foundBoard => foundBoard.authorImage = IMG_URL)
        await this.boardRepository.save(foundBoards);
      }


      return { message: 'success' };
    }catch(e){
      console.log('오류 발생')
    }
  }

  async getUserPl() {
    const found = await this.fileRepository.findOneBy({ user: { id: 1 } });
    return found;
  }
}
/* AWS S3 */
  /* async uploadFile(description, file: Express.Multer.File, user: User) {
    if (!user) throw new UnauthorizedException('유저정보를 확인해주세요');
    if (!file) {
      const found = await this.fileRepository.findOneBy({ user: { id: user.id } });
      if (!found) {
        const createUserPl = this.fileRepository.create({
          imageUrl: '',
          description: description.description,
          user,
        });
        await this.fileRepository.save(createUserPl);
      } else {
        found.description = description.description;
        await this.fileRepository.save(found);
      }
      return { message: 'Only changed Description' };
    }
    AWS.config.update({
      region: 'ap-northeast-2',
      credentials: {
        accessKeyId: S3Config.AWS_ACCESS_KEY_ID,
        secretAccessKey: S3Config.AWS_SECRET_ACCESS_KEY,
      },
    });
    try {
      const upload = await new AWS.S3()
        .upload({
          Bucket: S3Config.AWS_BUCKET_NAME,
          Key: `${Date.now() + file.originalname}`,
          Body: file.buffer,
        })
        .promise()
        .then(async (data) => {
          const found = await this.fileRepository.findOneBy({ user: { id: user.id } });
          if (found) {
            await this.fileRepository.delete({ id: found.id });
          }
          const createUserPl = this.fileRepository.create({
            imageUrl: data.Location,
            description: description.description,
            user,
          });
          await this.fileRepository.save(createUserPl);
        });
      return { message: 'success' };
    } catch (error) {
      console.log(error);
    }
  } */