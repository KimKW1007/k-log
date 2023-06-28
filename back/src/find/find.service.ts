import { ConflictException, Injectable } from '@nestjs/common';
import { FindIdDto } from './dto/find-findId.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindRepository } from './find.repository';
import { User } from 'src/auth/user.entity';
import { SendEmaildDto } from './dto/sendEmail.dto';
import { UserRepository } from 'src/auth/user.repository';

@Injectable()
export class FindService {
  constructor(
    @InjectRepository(FindRepository)
    private findRepository: FindRepository,
    private userRepository: UserRepository,
  ) {}

  sendEmail(sendEmaildDto: SendEmaildDto): Promise<void> {
    return this.findRepository.createPayload(sendEmaildDto);
  }

  async findId(findIdDto: FindIdDto){
    const {userEmail, token} = findIdDto;
    const certificatEmail = await this.findRepository.findOneBy({userEmail, token})
    if(!certificatEmail){
      throw new ConflictException('이메일 또는 토큰 값을 확인해주세요.'); 
    }
    const foundUser = await this.userRepository.find({where:{userEmail : certificatEmail.userEmail}})
    if(foundUser.length <= 0){
      throw new ConflictException('해당 이메일로 가입된 아이디가 없습니다.'); 
    }
    await this.findRepository.delete({userEmail})
    return foundUser
  }

}
