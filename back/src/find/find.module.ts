import { Module } from '@nestjs/common';
import { FindService } from './find.service';
import { FindController } from './find.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FindRepository } from './find.repository';
import { UserRepository } from 'src/auth/user.repository';
import { BoardModule } from 'src/board/board.module';
import { BoardRepository } from 'src/board/board.repository';
import { SubCategoryRepository } from 'src/category/category.repository';
import { FileRepository } from 'src/file/file.repository';
import { CommentRepository } from 'src/comment/comment.repository';
import { ReplyRepository } from 'src/comment/reply.repository';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';


config();
const configService = new ConfigService();
@Module({
  imports: [
    TypeOrmModule.forFeature([FindRepository]),
    MailerModule.forRoot({
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
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    })
  ],
  controllers: [FindController],
  providers: [FindService, FindRepository, UserRepository, BoardRepository, SubCategoryRepository, FileRepository, CommentRepository, ReplyRepository],
})
export class FindModule {}
