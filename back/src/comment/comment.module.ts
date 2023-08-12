import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentRepository } from './comment.repository';
import { BoardRepository } from 'src/board/board.repository';
import { SubCategoryRepository } from 'src/category/category.repository';
import { FileRepository } from 'src/file/file.repository';
import { ReplyRepository } from './reply.repository';
import { MailerModule } from '@nestjs-modules/mailer';
import * as config from "config"
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
const mailConfig = config.get("nodeMail");

@Module({
  imports: [TypeOrmModule.forFeature([CommentRepository]), TypeOrmModule.forFeature([ReplyRepository]), AuthModule,MailerModule.forRoot({
    transport: {
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: process.env.NODEMAIL_MAIL_ID || mailConfig.mailId,
        pass: process.env.NODEMAIL_MAIL_PW || mailConfig.mailPw,
      },
    },
    template: {
      dir: process.cwd() + '/template/',
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  })],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository, BoardRepository, SubCategoryRepository, FileRepository, ReplyRepository],
})
export class CommentModule {}
