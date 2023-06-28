import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { FindId } from './findId.entity';
import { FindIdDto } from './dto/find-findId.dto';
import { User } from 'src/auth/user.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { SendEmaildDto } from './dto/sendEmail.dto';

@Injectable()
export class FindRepository extends Repository<FindId> {
  constructor(
    private dataSource: DataSource,
    private readonly mailerService: MailerService,
  ) {
    super(FindId, dataSource.createEntityManager());
  }
  async createPayload(sendEmaildDto: SendEmaildDto): Promise<void> {
    const { userEmail } = sendEmaildDto;
    const payload = String(Math.floor(10000 + Math.random() * 1000000));
    const checkEmail = this.find({where: {userEmail}})
    if(checkEmail){
      await this.delete({userEmail})
    }
    const certification = this.create({
      userEmail,
      token: payload,
    });
    try{
      await this.mailerService
      .sendMail({
        from: process.env.MAIL_USER,
        to: `${userEmail}`,
        subject: 'K-log 인증번호',
        html: `<b>인증번호 : ${payload}</b>`,
      })
      await this.save(certification);
      console.log('전송완료/ 인증번호', payload)
    }catch(e){
      console.log(e)
      throw new ConflictException("오류발생");
    }
  }
}
