import { Controller, Post, Body, Req } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthRegistrationDto } from './dto/auth-registration.dto';
import { User } from './user.entity';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) authRegistrationDto: AuthRegistrationDto): Promise<void>{
    return this.authService.signUp(authRegistrationDto)
  }

  @Post("signin")
  singIn(@Body(ValidationPipe) authCredentialsDto : AuthCredentialsDto): Promise<{accessToken : string, user: User}>{
    return this.authService.signIn(authCredentialsDto)
  }

}
