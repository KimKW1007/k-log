import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { FindService } from './find.service';
import { FindIdDto } from './dto/find-findId.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { SendEmaildDto } from './dto/sendEmail.dto';

@Controller('find')
export class FindController {
  constructor(private findService: FindService) {}

  @Post('/sendEmail')
  async sendEmail(@Body(ValidationPipe) sendEmaildDto: SendEmaildDto): Promise<void> {
    return this.findService.sendEmail(sendEmaildDto);
  }

  @Post("/certificate")
  certificate(@Body(ValidationPipe) findIdDto: FindIdDto): Promise<{ message: string }>{
    return this.findService.certificate(findIdDto);
  }


  @Post("/findId")
  findId(@Body(ValidationPipe) findIdDto: FindIdDto): Promise<User[]>{
    return this.findService.findId(findIdDto);
  }

}
