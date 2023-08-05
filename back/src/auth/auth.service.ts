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
import * as config from "config"
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { CommentRepository } from 'src/comment/comment.repository';
import { ReplyRepository } from 'src/comment/reply.repository';
import axios from 'axios';
import { BoardRepository } from 'src/board/board.repository';
import { CategoryRepository, SubCategoryRepository } from 'src/category/category.repository';
import { FileRepository } from 'src/file/file.repository';

const jwtConfig = config.get("jwt")


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
      secret: jwtConfig.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: jwtConfig.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    });
  }

  async signUp(authRegistrationDto: AuthRegistrationDto): Promise<void> {
    return this.userRepository.createUser(authRegistrationDto);
  }
  async checkEmail(authCheckEmailDto: AuthCheckEmailDto): Promise<User[] | {user: User[], message: string}> {
    const { userEmail } = authCheckEmailDto;
    const user = await this.userRepository.find({ where: { userEmail }});
    const deletePasswordUser = this.userRepository.deletePasswordInUsers(user);

    if (user.length >= 5) {
        return {user : deletePasswordUser, message:'한개의 이메일은 최대 5개의 아이디만 생성할 수 있습니다.'}
    }

    return deletePasswordUser;
  }
  

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


  async changeThings(authChangeThingsDto: AuthChangeThingsDto , user: User): Promise<string>{
    const foundUser = await this.userRepository.changeThings(authChangeThingsDto, user)
    const accessToken = this.accessToken(foundUser);
    return accessToken

  }
  
  async checkChangeEmail(authCheckEmailDto: AuthCheckEmailDto , user: User): Promise<User[] | {user: User[], message: string}>{
    return await this.userRepository.checkChangeEmail(authCheckEmailDto, user)
  }

  async changePassword(authChangeThingsDto: AuthChangeThingsDto , user: User): Promise<{ message: string}>{
    return await this.userRepository.changePassword(authChangeThingsDto, user)
  }

  async checkCertificate(authPasswordCertificateDto: AuthPasswordCertificateDto , user: User): Promise<{ message: string}>{
    const {password} = authPasswordCertificateDto;
    const foundUser = await this.userRepository.findOneBy( {id : user.id} );
    if (!user || !(await bcrypt.compare(password, foundUser.password))) {
      throw new Error('비밀번호가 일치하지 않습니다.')
    }

    return {message : 'success'}
  }

  async refresh(refreshTokenDto: RefreshTokenDto): Promise<{ accessToken: string }> {
    const { refresh_token } = refreshTokenDto;

    // Verify refresh token
    // JWT Refresh Token 검증 로직
    const decodedRefreshToken = this.jwtService.verify(refresh_token, { secret: jwtConfig.JWT_REFRESH_TOKEN_SECRET });

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
  async removeRefreshToken(userId: number): Promise<any> {
    return await this.userRepository.update({id : userId}, {
      currentRefreshToken: null,
      currentRefreshTokenExp: null,
    });
  }

  async withdraw(user : User){
    const foundReply = await this.replyRepository.find({where : {authorId : user.id}})
    const foundComment = await this.commentRepository.find({where : {authorId : user.id}})

    const foundUser = await this.userRepository.findOne({where : {id : user.id}});
    if(foundReply.length > 0 || foundComment.length > 0){
      await this.categoryRepository.delete({user :{id : user.id}}); 
      await this.fileRepository.delete({user :{id : user.id}}); 
      foundUser.userId = `deleteUser${Date.now()}`
      foundUser.userEmail = `deleteUser${Date.now()}@gmail.com`
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(`deleteUser${Date.now()}`, salt);
      foundUser.password = hashedPassword
      await this.userRepository.save(foundUser)
    }else{
      try{
        await axios.delete(`${this.DATA_BOARD_DELETE}/withdraw/${user.userId}`)
        await this.userRepository.delete({id : user.id})
      }catch(e){
        console.log({e})
        throw new Error("회원탈퇴 이미지 삭제 중 오류 발생")
      }
    }
    return {message : 'success'}
  }


}
