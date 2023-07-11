import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcryptjs';
import { ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common/exceptions';
import { AuthRegistrationDto } from './dto/auth-registration.dto';
import { User } from './user.entity';
import { AuthCheckEmailDto } from './dto/auth-checkEmail.dto';
import { AuthChangeThingsDto } from './dto/auth-changeThings.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authRegistrationDto: AuthRegistrationDto): Promise<void> {
    return this.userRepository.createUser(authRegistrationDto);
  }
  async checkEmail(authCheckEmailDto: AuthCheckEmailDto): Promise<User[] | {user: User[], message: string}> {
    const { userEmail } = authCheckEmailDto;
    const user = await this.userRepository.find({ where: { userEmail } });

    if (user.length >= 5) {
        return {user, message:'한개의 이메일은 최대 5개의 아이디만 생성할 수 있습니다.'}
    }
    
    return user;
  }
  

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken : string}> {
    const { userId, password } = authCredentialsDto;
    const user = await this.userRepository.findOneBy({ userId });
    if (!user && !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('login failed');
    }
    // 유저 토큰 생성( Secret + Payload)
    delete user.password
    delete user.categories
    const payload = { ...user };
    const accessToken = this.jwtService.sign(payload);
    return {accessToken};
  }


  async changeThings(authChangeThingsDto: AuthChangeThingsDto , user: User): Promise<string>{
    const foundUser = await this.userRepository.changeThings(authChangeThingsDto, user)
    delete foundUser.password
    delete foundUser.categories
    const payload = { ...foundUser };
    const accessToken = this.jwtService.sign(payload);
    return accessToken

  }
  
  async checkChangeEmail(authCheckEmailDto: AuthCheckEmailDto , user: User): Promise<User[] | {user: User[], message: string}>{
    return await this.userRepository.checkChangeEmail(authCheckEmailDto, user)
  }

  async changePassword(authChangeThingsDto: AuthChangeThingsDto , user: User): Promise<{ message: string}>{
    return await this.userRepository.changePassword(authChangeThingsDto, user)
  }

}
