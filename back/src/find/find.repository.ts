import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { FindId } from './findId.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { SendEmaildDto } from './dto/sendEmail.dto';
import * as config from "config"
const mailConfig = config.get("nodeMail");

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
    const payload = String(Math.floor(Math.random() * 899999 + 100000));
    const checkEmail = await this.find({where: {userEmail}})
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
        from: `"K : log" <${mailConfig.mailId}>`,
        to: `${userEmail}`,
        subject: 'K : log 인증 코드',
        html: `
        <div style="width:100%;  background-color:#e4e4e4; box-sizing: border-box; padding : 50px 0;">
          <div style="width:600px; height: 420px; margin: 0 auto; box-sizing: border-box; padding : 50px; border-top: 8px solid #6F61C0; background-color:#23262d; color:#fff;">
            <h2 style="margin : 0; padding-bottom: 25px; margin-bottom: 65px; font-size: 20px; border-bottom:2px solid rgba(128,128,128,0.3)">K : Log</h2>
            <div style="text-align:center; font-size: 16px;">
              <p>K : Log 를 이용해 주셔서 감사합니다.</p>
              <br />
              <br />
              <p>회원님의 인증 코드는 다음과 같습니다.</p>
              <br />
              <br />
              <b style="font-weight: 800; font-size: 28px; letter-spacing: 1px;">${payload}</b>
            </div>
          </div>
        </div>`,
      })
      await this.save(certification);
      console.log('전송완료/ 인증번호', payload)
    }catch(e){
      console.log(e)
      throw new ConflictException("오류발생");
    }
  }
}
