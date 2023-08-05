import { Logger } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';

const mkdir = (directory: string) => {
  const logger = new Logger('Mkdir');
  try {
    fs.readdirSync(path.join(process.cwd(), directory));
  } catch (err) {
    logger.log(
      `지정한 경로에 ${directory}가 존재하지 않아 ${directory}를 생성합니다.`,
    );
    fs.mkdirSync(path.join(process.cwd(), directory));
  }
};

mkdir('uploads');

export const multerOptionsFactory = (): MulterOptions => {
  return {
    storage: multer.diskStorage({
      destination(req, file, done) { // 파일을 저장할 위치를 설정
        done(null, path.join(process.cwd(), 'uploads'));
      },

      filename(req, file, done) { // 파일의 이름을 설정.
        const filename = Buffer.from(file.originalname, 'latin1').toString('utf8')
        const ext = path.extname(filename); // 파일 확장자 추출
        const basename = path.basename(filename, ext);  // 파일 이름
        // 파일 이름이 중복되는 것을 막기 위해 '파일이름_날짜.확장자' 의 형식으로 파일이름을 지정.
        if(req.query.userId){
          const file = fs.readdirSync(`${process.cwd()}/uploads`, 'utf8')
          const deleteOneByUserId = file.find(x => x.split("_")[0] === `${req.query.userId}`);
          if(deleteOneByUserId){
            fs.unlinkSync(`${process.cwd()}/uploads/${deleteOneByUserId}`)
          }
          done(null, `${req.query.userId}_profile_${basename}_${Date.now()}${ext}`);
        }else{
          done(null, `${basename}_${Date.now()}${ext}`);  
        }
      },
    }),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB로 크기를 제한
  };
};