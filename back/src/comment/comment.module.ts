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
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
config();
const configService = new ConfigService();
@Module({
  imports: [TypeOrmModule.forFeature([CommentRepository]), TypeOrmModule.forFeature([ReplyRepository]), AuthModule,MailerModule.forRoot({
    transport: {
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: configService.get('NODEMAIL_MAIL_ID'),
        pass: configService.get('NODEMAIL_MAIL_PW'),
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
