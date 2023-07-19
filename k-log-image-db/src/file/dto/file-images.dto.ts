import { Repository } from 'typeorm';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { Images } from '../file.entity';


export class ImagesDto extends Repository<Images> {

  @IsNotEmpty()
  file : Express.Multer.File;


  @IsNotEmpty()
  userId : string;
}
