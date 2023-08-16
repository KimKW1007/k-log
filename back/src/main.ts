import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from "cookie-parser"
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  config()
  const configService = app.get(ConfigService);
  const clientUrl = configService.get("CLIENT_URL");
  app.use(cookieParser());

  app.enableCors({
    origin:[`${clientUrl}`,'http://localhost:3000' ],
    credentials:true
  });
  const port = configService.get("SERVER_PORT");
  await app.listen(port);
  Logger.log(`Application running on port ${port}`)
}
bootstrap();
