import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as config from 'config';
import * as AWS from 'aws-sdk';
import { User } from 'src/auth/user.entity';
import { FileRepository } from './file.repository';
import { InjectRepository } from '@nestjs/typeorm';

const S3Config = config.get('S3');

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileRepository)
    private fileRepository: FileRepository
  ) {}

  async uploadFile(description, file: Express.Multer.File, user: User) {
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
  }

  async getUserPl() {
    const found = await this.fileRepository.findOneBy({ user: { id: 1 } });
    return found;
  }
}
