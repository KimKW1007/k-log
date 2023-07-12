import { ConflictException, Injectable } from '@nestjs/common';
import { CertificateEmailDto } from './dto/certificate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindRepository } from './find.repository';
import { User } from 'src/auth/user.entity';
import { SendEmaildDto } from './dto/sendEmail.dto';
import { UserRepository } from 'src/auth/user.repository';
import { FindId } from './findId.entity';
import { CheckUserDto } from './dto/checkUser.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';
import * as bcrypt from 'bcryptjs';

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

  async getOneUserByEmail(certificateEmailDto: CertificateEmailDto):Promise<FindId>{
    const { userEmail, token } = certificateEmailDto;
    if (!certificateEmailDto) {
      throw new ConflictException('이메일 또는 토큰 값을 확인해주세요.');
    }
    const certificatEmail = await this.findRepository.findOneBy({
      userEmail,
      token,
    });
    if (!certificatEmail) {
      throw new ConflictException('이메일 또는 토큰 값을 확인해주세요.');
    }
    return certificatEmail
  }

  async certificate(
    certificateEmailDto: CertificateEmailDto,
  ): Promise<{ message: string }> {
    const { userEmail } = certificateEmailDto;
    const certificatEmail = await this.getOneUserByEmail(certificateEmailDto)
    await this.findRepository.delete({ userEmail });

    return { message: 'success' };
  }


  async checkUserIdByUserIdEmail(checkUserDto: CheckUserDto): Promise<{ message: string }>{
    const { userEmail, userId } = checkUserDto;
    const foundUser = await this.userRepository.findOneBy({
      userEmail, userId
    });
    if(!foundUser){
      throw new ConflictException('아이디와 이메일을 확인해주세요.');
    }
    await this.findRepository.delete({ userEmail });
    return {message : "success"}
  }

  async getOneUserChangePassword(changePasswordDto: ChangePasswordDto): Promise<{ message: string }>{
    const { userEmail, userId, password } = changePasswordDto;
    const foundUser = await this.userRepository.findOneBy({
        userEmail, userId 
    });
    if(!foundUser){
      throw new ConflictException('아이디와 이메일을 확인해주세요.');
    }
    await this.findRepository.delete({ userEmail });
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    foundUser.password = hashedPassword
    await this.userRepository.save(foundUser)

    return {message : "success"}
  }



}
