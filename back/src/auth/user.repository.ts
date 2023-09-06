import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { ConflictException, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common/exceptions';
import * as bcrypt from 'bcryptjs';
import { AuthRegistrationDto } from './dto/auth-registration.dto';
import { AuthCheckEmailDto } from './dto/auth-checkEmail.dto';
import { AuthChangeThingsDto } from './dto/auth-changeThings.dto';
import { BoardRepository } from 'src/board/board.repository';
import { CommentRepository } from 'src/comment/comment.repository';
import { ReplyRepository } from 'src/comment/reply.repository';
import { FileRepository } from 'src/file/file.repository';
import { selectedImage } from 'src/utils/defaultRandomImage';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';
import uploads from 'src/utils/imageUploads';




@Injectable()
export class UserRepository extends Repository<User> {
    constructor(private dataSource: DataSource,
      private boardRepository: BoardRepository,
      private commentRepository: CommentRepository,
      private replyRepository: ReplyRepository,
      private fileRepository: FileRepository,
      private configService : ConfigService ,

      ) {   
    super(User, dataSource.createEntityManager());
  }

  deletePasswordInUsers(user : User[]){
    const deletePasswordUser = user.map(ele => {
      delete ele.password
      return ele
    })
    return deletePasswordUser
  }

  /* 회원가입 */
  async createUser(authRegistrationDto: AuthRegistrationDto): Promise<void> {
    const { userId, password, userName, userEmail } = authRegistrationDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      userId,
      password: hashedPassword,
      userName,
      userEmail,
    });

    try {
      await this.save(user);
    } catch (e) {
      if (e.code === '23505') {
        throw new ConflictException('이미 사용 중인 아이디입니다.');
      } else {
        throw new InternalServerErrorException();
      }
    }
    
    fs.readFile(selectedImage, async (err, data)=> {
      if (err) {
        console.error('Error reading image file:', err);
        return;
      }

      try{
        const imageUrl = await uploads(data, 'image/jpg' ,this.configService.get("IMGUR_ID"))
        const createUserPl = this.fileRepository.create({
          imageUrl,
          description: "",
          user,
        });
        await this.fileRepository.save(createUserPl);
      }catch(e){
        throw new Error("이미지 저장 중 오류발생")
      }

    });
  }


  async changeThings(authChangeThingsDto: AuthChangeThingsDto, user: User): Promise<User> {
    const { userId, userEmail, userName } = authChangeThingsDto;
    const foundUser = await this.findOneBy({ id: user.id });
    if (!foundUser) throw new NotFoundException('해당 유저를 찾을 수 없습니다.', { cause: new Error() });
    if (foundUser.userId === userId || foundUser.userName === userName) throw new BadRequestException('변경된 값이 없습니다.', { cause: new Error() });

    const foundComments = await this.commentRepository.find({where:{ board : {subCategory :{ category :{ user: {id : user.id}}}}}})
    const foundReplyComments = await this.replyRepository.find({where:{connectedComment : { board : {subCategory :{ category :{ user: {id : user.id}}}}}}})


    if (userId) {
      const checkDuplicate = await this.findOneBy({ userId });
      if(checkDuplicate) throw new BadRequestException('이미 사용중인 아이디 입니다.', { cause: new Error() });
      foundUser.userId = userId;
    }
    if (userEmail) {
      if(foundComments){
        foundComments.map(foundComment =>foundComment.authorEmail = userEmail)
        await this.commentRepository.save(foundComments)
      }
      if(foundReplyComments){
        foundReplyComments.map(foundReplyComment =>foundReplyComment.authorEmail = userEmail)
        await this.replyRepository.save(foundReplyComments)
      }
      foundUser.userEmail = userEmail;
    }
    if (userName) {
      const foundBoards = await this.boardRepository.find({where:{subCategory :{ category :{ user: {id : user.id}}}}})

      foundUser.userName = userName;
      if(foundBoards){
        foundBoards.map(foundBoard =>foundBoard.author = userName)
        await this.boardRepository.save(foundBoards)
      }
      if(foundComments){
        foundComments.map(foundComment =>foundComment.authorName = userName)
        await this.commentRepository.save(foundComments)
      }
      if(foundReplyComments){
        foundReplyComments.map(foundReplyComment =>foundReplyComment.authorName = userName)
        await this.replyRepository.save(foundReplyComments)
      }
    }
    

    await this.save(foundUser);

    return foundUser;
  }
  async checkChangeEmail(authCheckEmailDto: AuthCheckEmailDto, userData: User): Promise<User[] | {user: User[], message: string}> {
    const { userEmail } = authCheckEmailDto;
    const foundUser = await this.findOneBy({ id: userData.id });
    if (!foundUser) throw new NotFoundException('해당 유저를 찾을 수 없습니다.', { cause: new Error() });
    if (foundUser.userEmail === userEmail) throw new BadRequestException('변경된 값이 없습니다.', { cause: new Error() });
    const user = await this.find({ where: { userEmail } });
    const deletePasswordUser = this.deletePasswordInUsers(user)
    if (user.length >= 5) {
        return {user : deletePasswordUser, message:'한개의 이메일은 최대 5개의 아이디만 생성할 수 있습니다.'}
    }

    return deletePasswordUser;
  }
  async changePassword(authChangeThingsDto: AuthChangeThingsDto, user: User): Promise<{ message: string}> {
    const { password } = authChangeThingsDto;
    const foundUser = await this.findOneBy({id: user.id});
    if(!foundUser){
      throw new ConflictException('계정을 확인해주세요');
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    foundUser.password = hashedPassword
    await this.save(foundUser)

    return {message : "success"}
  }

  async getCurrentHashedRefreshToken(refreshToken: string) {
    // 토큰 값을 그대로 저장하기 보단, 암호화를 거쳐 데이터베이스에 저장한다. 
    // bcrypt는 단방향 해시 함수이므로 암호화된 값으로 원래 문자열을 유추할 수 없다. 
    const salt = await bcrypt.genSalt();
    const currentRefreshToken = await bcrypt.hash(refreshToken, salt);
    return currentRefreshToken;
  }

  async getCurrentRefreshTokenExp(): Promise<Date> {
    const currentDate = new Date();
  	// Date 형식으로 데이터베이스에 저장하기 위해 문자열을 숫자 타입으로 변환 (paresInt) 
    const currentRefreshTokenExp = new Date(currentDate.getTime() + parseInt(this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')));
    return currentRefreshTokenExp;
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: number): Promise<User> {
    const user: User = await this.findOneBy({id : userId});
	
	// user에 currentRefreshToken이 없다면 null을 반환 (즉, 토큰 값이 null일 경우)
    if (!user.currentRefreshToken) {
      return null;
    }
	
    // 유저 테이블 내에 정의된 암호화된 refresh_token값과 요청 시 body에 담아준 refresh_token값 비교
    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.currentRefreshToken
    );

	// 만약 isRefreshTokenMatching이 true라면 user 객체를 반환
    if (isRefreshTokenMatching) {
      return user;
    } 
  }

}
