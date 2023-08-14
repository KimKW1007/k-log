import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as path from 'path';
import express from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  config()
  const configService = app.get(ConfigService);
  app.enableCors({
    origin:"*",
    credentials:true
  });
  app.setGlobalPrefix('api');
  app.useStaticAssets(path.join(__dirname, '../..', 'public'), {
    prefix: `/api/`,
  });
  const port = configService.get("SERVER_PORT");
  await app.listen(port);
  
  Logger.log(`Application running on port ${port}`)
}
bootstrap();
` `