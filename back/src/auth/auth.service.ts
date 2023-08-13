import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcryptjs';
import { BadRequestException, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common/exceptions';
import { AuthRegistrationDto } from './dto/auth-registration.dto';
import { User } from './user.entity';
import { AuthCheckEmailDto } from './dto/auth-checkEmail.dto';
import { AuthChangeThingsDto } from './dto/auth-changeThings.dto';
import { AuthPasswordCertificateDto } from './dto/auth-checkPasswordCertificate.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { CommentRepository } from 'src/comment/comment.repository';
import { ReplyRepository } from 'src/comment/reply.repository';
import axios from 'axios';
import { BoardRepository } from 'src/board/board.repository';
import { CategoryRepository, SubCategoryRepository } from 'src/category/category.repository';
import { FileRepository } from 'src/file/file.repository';



@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private commentRepository: CommentRepository,
    private replyRepository: ReplyRepository,
    private categoryRepository: CategoryRepository,
    private fileRepository: FileRepository,
  ) {}
  private readonly DATA_BOARD_DELETE = 'http://localhost:8000/api';

  async accessToken(user : User): Promise<string>{
    delete user.password
    delete user.categories
    const payload = { ...user };
    const accessToken = this.jwtService.signAsync(payload);
    return accessToken
  }
  async refreshToken(user: User): Promise<string> {
    delete user.password
    delete user.categories
    const payload = { ...user };
    return this.jwtService.signAsync({id: payload.id}, {
      secret:  process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    });
  }


  /* 회원가입 */
  async signUp(authRegistrationDto: AuthRegistrationDto): Promise<void> {
    return this.userRepository.createUser(authRegistrationDto);
  }
  /* 회원가입 시 해당 이메일 아이디 */
  async checkEmail(authCheckEmailDto: AuthCheckEmailDto): Promise<User[] | {user: User[], message: string}> {
    const { userEmail } = authCheckEmailDto;
    const user = await this.userRepository.find({ where: { userEmail }});
    const deletePasswordUser = this.userRepository.deletePasswordInUsers(user);

    if (user.length >= 5) {
        return {user : deletePasswordUser, message:'한개의 이메일은 최대 5개의 아이디만 생성할 수 있습니다.'}
    }

    return deletePasswordUser;
  }
  


  /* 로그인 */
  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{user : User,accessToken : string, refreshToken : string}> {
    const { userId, password } = authCredentialsDto;
    const user = await this.userRepository.findOneBy({ userId });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('login failed');
    }
    // 유저 토큰 생성( Secret + Payload)
    const accessToken = await this.accessToken(user);
    const refreshToken = await this.refreshToken(user);
    return {user, accessToken, refreshToken};
  }

  async setCurrentRefreshToken(refreshToken: string , userId: number) {
    const currentRefreshToken = await this.userRepository.getCurrentHashedRefreshToken(refreshToken);
    const currentRefreshTokenExp = await this.userRepository.getCurrentRefreshTokenExp();
    await this.userRepository.update({id : userId}, {
      currentRefreshToken: currentRefreshToken,
      currentRefreshTokenExp: currentRefreshTokenExp,
    });
  }

  /* 계정설정 */
  async changeThings(authChangeThingsDto: AuthChangeThingsDto , user: User): Promise<string>{
    const foundUser = await this.userRepository.changeThings(authChangeThingsDto, user)
    const accessToken = this.accessToken(foundUser);
    return accessToken

  }
  

  /* 이메일 확인 */
  async checkChangeEmail(authCheckEmailDto: AuthCheckEmailDto , user: User): Promise<User[] | {user: User[], message: string}>{
    return await this.userRepository.checkChangeEmail(authCheckEmailDto, user)
  }


  /* 비밀번호 변경 */
  async changePassword(authChangeThingsDto: AuthChangeThingsDto , user: User): Promise<{ message: string}>{
    return await this.userRepository.changePassword(authChangeThingsDto, user)
  }

  /* 계정설정 비밀번호확인 */
  async checkCertificate(authPasswordCertificateDto: AuthPasswordCertificateDto , user: User): Promise<{ message: string}>{
    const {password} = authPasswordCertificateDto;
    const foundUser = await this.userRepository.findOneBy( {id : user.id} );
    if (!user || !(await bcrypt.compare(password, foundUser.password))) {
      throw new Error('비밀번호가 일치하지 않습니다.')
    }

    return {message : 'success'}
  }

  /* refreshToken 으로 AccessToken 새로받기 */
  async refresh(refreshTokenDto: RefreshTokenDto): Promise<{ accessToken: string }> {
    const { refresh_token } = refreshTokenDto;

    // Verify refresh token
    // JWT Refresh Token 검증 로직
    const decodedRefreshToken = this.jwtService.verify(refresh_token, { secret: process.env.JWT_REFRESH_TOKEN_SECRET});

    // Check if user exists
    const userId = decodedRefreshToken.id;
    const user = await this.userRepository.getUserIfRefreshTokenMatches(refresh_token, userId);
    if (!user) {
      throw new UnauthorizedException('Invalid user!');
    }

    // Generate new access token
    const accessToken = await this.accessToken(user);

    return {accessToken};
  }

  /* 로그아웃 시 리프레쉬토큰 삭제*/
  async removeRefreshToken(userId: number): Promise<any> {
    return await this.userRepository.update({id : userId}, {
      currentRefreshToken: null,
      currentRefreshTokenExp: null,
    });
  }


  /* 회원탈퇴 */
  async withdraw(user : User){
    const foundUser = await this.userRepository.findOne({where : {id : user.id}});
    if(!foundUser){
      throw new BadRequestException("탈퇴할 유저가 없습니다.")
    }
      try{
        await axios.delete(`${this.DATA_BOARD_DELETE}/withdraw/${user.userId}`)
        await this.userRepository.delete({id : user.id})
      }catch(e){
        console.log({e})
        throw new Error("회원탈퇴 이미지 삭제 중 오류 발생")
      }
    return {message : 'success'}
  }


}
