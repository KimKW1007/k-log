import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcryptjs';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { AuthRegistrationDto } from './dto/auth-registration.dto';
import { User } from './user.entity';

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

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken : string, user: User}> {
    const { userId, password } = authCredentialsDto;
    const user = await this.userRepository.findOneBy({ userId });
    if (user && (await bcrypt.compare(password, user.password))) {
      // 유저 토큰 생성( Secret + Payload)
      const payload = { userId };
      const accessToken = await this.jwtService.sign(payload);
      delete user.password;
      return { accessToken, user };
    } else {
      throw new UnauthorizedException('login failed');
    }
  }
}
