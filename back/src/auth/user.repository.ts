import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { ConflictException, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common/exceptions';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcryptjs';
import { AuthRegistrationDto } from './dto/auth-registration.dto';
import { AuthCheckEmailDto } from './dto/auth-checkEmail.dto';
import { AuthChangeThingsDto } from './dto/auth-changeThings.dto';
import { BoardRepository } from 'src/board/board.repository';

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(private dataSource: DataSource,
      private boardRepository: BoardRepository
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
  }


  async changeThings(authChangeThingsDto: AuthChangeThingsDto, user: User): Promise<User> {
    const { userId, userEmail, userName } = authChangeThingsDto;
    const foundUser = await this.findOneBy({ id: user.id });
    if (!foundUser) throw new NotFoundException('해당 유저를 찾을 수 없습니다.', { cause: new Error() });
    if (foundUser.userId === userId || foundUser.userName === userName) throw new BadRequestException('변경된 값이 없습니다.', { cause: new Error() });
    if (userId) {
      const checkDuplicate = await this.findOneBy({ userId });
      if(checkDuplicate) throw new BadRequestException('이미 사용중인 아이디 입니다.', { cause: new Error() });
      foundUser.userId = userId;
    }
    if (userEmail) {
      foundUser.userEmail = userEmail;
    }
    if (userName) {
      const foundBoards = await this.boardRepository.find({where:{subCategory :{ category :{ user: {id : user.id}}}}})
      foundUser.userName = userName;
      if(foundBoards){
        foundBoards.map(foundBoard =>foundBoard.author = userName)
        await this.boardRepository.save(foundBoards)
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
}
