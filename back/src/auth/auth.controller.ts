import {
  Controller,
  Post,
  Body,
  Req,
  HttpCode,
  UseGuards,
  Res,
  Get,
} from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthRegistrationDto } from './dto/auth-registration.dto';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authRegistrationDto: AuthRegistrationDto,
  ): Promise<void> {
    return this.authService.signUp(authRegistrationDto);
  }

  @Post('/signin')
  async singIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
    @Res() res: Response,
  ): Promise<any> {
    const jwt = await this.authService.signIn(authCredentialsDto);
    res.setHeader('Authorization', 'Bearer ' + jwt.accessToken);
    return res.json(jwt);
  }

  @Get("/authenticate")
  @UseGuards(AuthGuard())
  isAuthenticated(@Req() req : any):User{
    const user : User = req.user;
    return user;
  }
}
