
import { BadRequestException, Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';



@Injectable()
export class FileService {
  async uploadFile(file : Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('파일이 존재하지 않습니다.');
    }
    AWS.config.update({
      region: 'ap-northeast-2',
      credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      }
  })
    try {
      const upload = await new AWS.S3()
        .upload({
          Key: `${Date.now() + file.originalname}`,
          Body: file.buffer,
          Bucket: 'klog-bucket',
        })
        .promise();
      return upload.Location
    } catch (error) {
      console.log({error});
    }
  }
}