import { Module } from '@nestjs/common';
import { FindService } from './find.service';
import { FindController } from './find.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FindRepository } from './find.repository';
import { UserRepository } from 'src/auth/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([FindRepository]),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: 'face676934@gmail.com',
          pass: 'fspnpbybqsumdepa',
        },
      },
      template: {
        dir: process.cwd() + '/template/',
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [FindController],
  providers: [FindService, FindRepository, UserRepository],
})
export class FindModule {}
