import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { Injectable } from "@nestjs/common";
import { ConflictException, InternalServerErrorException } from "@nestjs/common/exceptions";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import * as bcrypt from 'bcryptjs';
import { AuthRegistrationDto } from "./dto/auth-registration.dto";

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  async createUser(authRegistrationDto:AuthRegistrationDto):Promise<void>{
    const {userId, password, userName, userEmail} = authRegistrationDto;

    const checkEmailLength = (await this.find({ where:{userEmail} })).length;
    if(checkEmailLength >= 5){
      throw new ConflictException('한개의 이메일은 최대 5개의 아이디만 생성할 수 있습니다.')
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({userId, password : hashedPassword, userName, userEmail})
    try{
      await this.save(user)
    }catch(e){
      if(e.code === '23505'){
        throw new ConflictException('이미 사용 중인 아이디입니다.')
      }else{
        throw new InternalServerErrorException();
      }
    }
  }
}
