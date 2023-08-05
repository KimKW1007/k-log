import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import * as config from "config"
import { BoardRepository } from 'src/board/board.repository';
import { CategoryRepository, SubCategoryRepository } from 'src/category/category.repository';
import { FileRepository } from 'src/file/file.repository';
import { CommentRepository } from 'src/comment/comment.repository';
import { ReplyRepository } from 'src/comment/reply.repository';


const jwtConfig = config.get("jwt")

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_TOKEN_SECRET || jwtConfig.JWT_ACCESS_TOKEN_SECRET,
      signOptions: {
        expiresIn: jwtConfig.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
      },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, CategoryRepository ,JwtStrategy, BoardRepository, SubCategoryRepository, FileRepository, CommentRepository, ReplyRepository],
  exports:[JwtStrategy, PassportModule]
})
export class AuthModule {}
