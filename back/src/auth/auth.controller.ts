import {
  Controller,
  Post,
  Body,
  Req,
  HttpCode,
  UseGuards,
  Res,
  Get,
  Patch,
} from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthRegistrationDto } from './dto/auth-registration.dto';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express';
import { AuthCheckEmailDto } from './dto/auth-checkEmail.dto';
import {  GetUser } from 'src/auth/get-user.decorator';
import { AuthChangeThingsDto } from './dto/auth-changeThings.dto';
import { AuthPasswordCertificateDto } from './dto/auth-checkPasswordCertificate.dto';


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
    res.cookie('jwt', jwt.accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 420 * 60 * 1000,
    });
    return res.json({
      accessToken: jwt.accessToken,
    });
  }

  @Get('/authenticate')
  @UseGuards(AuthGuard())
  isAuthenticated(@Req() req: any): User {
    const user: User = req.user;
    return user;
  }

  @Post('/checkemail')
  async checkEmail(
    @Body(ValidationPipe) authCheckEmailDto: AuthCheckEmailDto,
    @Res() res: any,
  ): Promise<User[] | {user: User[], message: string}> {
    return res.json(await this.authService.checkEmail(authCheckEmailDto));
  }

  @Patch('/changeThings')
  @UseGuards(AuthGuard())
  async changeThings(
    @Body() authChangeThingsDto: AuthChangeThingsDto,
    @GetUser() user : User,
    @Res() res: Response,
  ) : Promise<any>{
    const accessToken = await this.authService.changeThings(authChangeThingsDto , user)
    res.setHeader('Authorization', 'Bearer ' + accessToken);
    res.cookie('jwt', accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 420 * 60 * 1000,
    });
    return res.json(accessToken)
  }

  @Post('/checkChangeEmail')
  @UseGuards(AuthGuard())
  async checkChangeEmail(
    @Body(ValidationPipe) authCheckEmailDto: AuthCheckEmailDto,
    @Res() res: any,
    @GetUser() user : User
  ): Promise<User[] | {user: User[], message: string}> {
    return res.json(await this.authService.checkChangeEmail(authCheckEmailDto, user));
  }
  @Patch('/changePassword')
  @UseGuards(AuthGuard())
  async changePassword(
    @Body() authChangeThingsDto: AuthChangeThingsDto,
    @Res() res: any,
    @GetUser() user : User
  ): Promise<{message: string}> {
    return res.json(await this.authService.changePassword(authChangeThingsDto, user));
  }


  @Post('/checkCertificate')
  @UseGuards(AuthGuard())
  async checkCertificate(
    @Body(ValidationPipe) authPasswordCertificateDto: AuthPasswordCertificateDto,
    @GetUser() user : User
  ): Promise<{message: string}> {
    return await this.authService.checkCertificate(authPasswordCertificateDto, user);
  }

  @Get('/cookies')
  getCookies(@Req() req: Request, @Res() res: Response): any {
    const jwt = req.cookies['jwt'];
    return res.send(jwt);
  }

  @Post('/logout')
  logout(@Res() res: Response): any {
    res.cookie('jwt', '', {
      maxAge: 0,
    });
    return res.send({
      message: 'success',
    });
  }
}
