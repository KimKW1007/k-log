import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcryptjs';
import { ConflictException, UnauthorizedException } from '@nestjs/common/exceptions';
import { AuthRegistrationDto } from './dto/auth-registration.dto';
import { User } from './user.entity';
import { AuthCheckEmailDto } from './dto/auth-checkEmail.dto';

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
  async checkEmail(authCheckEmailDto: AuthCheckEmailDto): Promise<User[]> {
    const { userEmail } = authCheckEmailDto;
    const user = await this.userRepository.find({ where: { userEmail } });

    if (user.length >= 5) {
      throw new ConflictException(
        '한개의 이메일은 최대 5개의 아이디만 생성할 수 있습니다.',
      );
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
    const payload = { ...user };
    const accessToken = this.jwtService.sign(payload);
    return {accessToken};
  }
}
