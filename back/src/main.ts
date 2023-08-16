import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from "cookie-parser"
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';


async function bootstrap() {
  let clientUrl;
  const app = await NestFactory.create(AppModule,{cors :{ origin : [`${clientUrl}`,'http://localhost:3000'] , credentials:true}});
  config()
  const configService = app.get(ConfigService);
  clientUrl = configService.get("CLIENT_URL");
  app.use(cookieParser());

  const port = configService.get("SERVER_PORT");
  await app.listen(port);
  Logger.log(`Application running on port ${port}`)
}
bootstrap();
