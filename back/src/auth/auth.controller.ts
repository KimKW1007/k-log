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
  UnauthorizedException,
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
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ConfigService } from '@nestjs/config';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private configService: ConfigService) {}
  private readonly DOMAIN = this.configService.get<string>('BASE_URL')

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
    const {user, accessToken, refreshToken} = await this.authService.signIn(authCredentialsDto);
    await this.authService.setCurrentRefreshToken(refreshToken, user.id)
    res.setHeader('Authorization', 'Bearer ' + accessToken);
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      domain : ".k-log.vercel.app"
    });
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      domain : ".k-log.vercel.app"
    });
    return res.json({
      message:'login_success',
      accessToken,
      refreshToken
    });
  }

  @Get('/authenticate')
  @UseGuards(AuthGuard())
  isAuthenticated(@GetUser() user : User): User {
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
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      sameSite: 'none', 
      secure: true 
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
    const access_token = req.cookies['access_token'];
    return res.send(access_token);
  }

  @Post('/logout')
  @UseGuards(AuthGuard())
  async logout(@Res() res: Response, @GetUser() user :User): Promise<any> {
    await this.authService.removeRefreshToken(user.id);
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    return res.send({
      message: 'success',
    });
  }
  @Post('/cleanCookie')
  async cleanCookie(@Res() res: Response, @GetUser() user :User): Promise<any> {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    return res.send({
      message: 'success',
    });
  }

  @Post('/refresh')
  async refresh(
    @Body() refreshTokenDto: RefreshTokenDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const newAccessToken = (await this.authService.refresh(refreshTokenDto)).accessToken;
      res.setHeader('Authorization', 'Bearer ' + newAccessToken);
      res.cookie('access_token', newAccessToken, {
        httpOnly: true,
        sameSite: 'none', 
        secure: true 
      });
      return res.json({newAccessToken});
    } catch(err) {
      throw new UnauthorizedException('Invalid refresh-token');
    }
  }


  @Post("/withdraw")
  @UseGuards(AuthGuard())
  async withdraw(@Res() res: Response,@GetUser() user :User){
    const message = await this.authService.withdraw(user).then(async result =>{
      await this.authService.removeRefreshToken(user.id);
      res.clearCookie('access_token');
      res.clearCookie('refresh_token');
    });
    
    return res.send(message)
  }



}
