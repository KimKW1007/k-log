import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
// import * as config from 'config';
// import * as AWS from 'aws-sdk';
import { User } from 'src/auth/user.entity';
import { FileRepository } from './file.repository';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { BoardRepository } from 'src/board/board.repository';
import { CommentRepository } from 'src/comment/comment.repository';
import { ReplyRepository } from 'src/comment/reply.repository';
import { ConfigService } from '@nestjs/config';
import uploads from 'src/utils/imageUploads';

// const S3Config = config.get('S3');

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileRepository)
    private fileRepository: FileRepository,
    private boardRepository: BoardRepository,
    private commentRepository: CommentRepository,
    private replyRepository: ReplyRepository,
    private configService : ConfigService ,
  ) {}
  private readonly DATA_URL = this.configService.get("IMAGE_SERVER_UPLOADS_URL") || 'http://localhost:8000/api/uploads';

  
  async uploadFile(description : string, file: Express.Multer.File, user: User){
    if (!user) throw new UnauthorizedException('유저정보를 확인해주세요');
    const found = await this.fileRepository.findOneBy({ user: { id: user.id } });
    if (!file) {
      found.description = description;
      await this.fileRepository.save(found);
      return { message: 'Only changed Description' };
    }
    const foundBoards = await this.boardRepository.find({where : {subCategory : {category : {user : {id : user.id}}}}})
    const foundComments = await this.commentRepository.find({where : {board : {subCategory : {category : {user : {id : user.id}}}}}})
    const foundReplies = await this.replyRepository.find({where : {connectedComment : {board : {subCategory : {category : {user : {id : user.id}}}}}}})
    try{
      const imageUrl = await uploads(file.buffer, file.mimetype, this.configService.get("IMGUR_ID"))
      found.imageUrl = imageUrl;
      found.description = description;
      await this.fileRepository.save(found);
      if(foundBoards){
        foundBoards.map(foundBoard => foundBoard.authorImage = imageUrl)
        await this.boardRepository.save(foundBoards);
      }
      if(foundComments){
        foundComments.map(foundComment => foundComment.authorImage = imageUrl)
        await this.commentRepository.save(foundComments);
      }
      if(foundReplies){
        foundReplies.map(foundReply => foundReply.authorImage = imageUrl)
        await this.boardRepository.save(foundBoards);
      }


      return { message: 'success' };
    }catch(e){
      console.log('오류 발생')
    }
  }

  async getAdminPl() {
    const found = await this.fileRepository.findOneBy({ user: { id: 1 } });
    return found;
  }
  async getUserPl(user : User) {
    const found = await this.fileRepository.findOneBy({ user: { id: user.id } });
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