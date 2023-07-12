import { Body, Controller, Post, ValidationPipe, Patch } from '@nestjs/common';
import { FindService } from './find.service';
import { CertificateEmailDto } from './dto/certificate.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { SendEmaildDto } from './dto/sendEmail.dto';
import { CheckUserDto } from './dto/checkUser.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';

@Controller('find')
export class FindController {
  constructor(private findService: FindService) {}

  @Post('/sendEmail')
  async sendEmail(
    @Body(ValidationPipe) sendEmaildDto: SendEmaildDto,
  ): Promise<void> {
    return this.findService.sendEmail(sendEmaildDto);
  }

  @Post('/certificate')
  certificate(
    @Body(ValidationPipe) certificateEmailDto: CertificateEmailDto,
  ): Promise<{ message: string }> {
    return this.findService.certificate(certificateEmailDto);
  }

  @Post("/checkUser")
  findUserbyIdEmail(@Body(ValidationPipe) checkUserDto: CheckUserDto): Promise<{ message: string }> {
    return this.findService.checkUserIdByUserIdEmail(checkUserDto);
  }

  @Patch("/changePassword")
  getOneUserChangePassword(@Body(ValidationPipe) changePasswordDto : ChangePasswordDto) : Promise<{ message: string }> {
    return this.findService.getOneUserChangePassword(changePasswordDto);
  }

}
